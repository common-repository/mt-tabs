<?php
/*
Plugin Name: MT Tabs
Description: Create your own tabs on the posts or page tabs or accordion style.
Author: Megatemas
Version: 1.0
Author URI: http://www.megatemas.com/
Plugin URI: http://megatemas.com/mt-tabs/
*/

	$url = plugin_dir_url(__FILE__);

	add_action( 'plugins_loaded', 'mt_tabs_load_textdomain' );

	function mt_tabs_load_textdomain() {
	  load_plugin_textdomain('mt-tabs', false, dirname( plugin_basename( __FILE__ ) ) . '/lang/'); 
	}

	function mt_tabs_tinymce_plugin_add_locale($locales) {
		$arr[] = plugin_dir_path ( __FILE__ ) . 'tinymce-lang.php';
		return $arr;
	}
	
	add_filter('mce_external_languages', 'mt_tabs_tinymce_plugin_add_locale');

	function mt_tabs_mce_button() {
		if ( !current_user_can( 'edit_posts' ) && !current_user_can( 'edit_pages' ) ) {
			return;
		}
		if ( 'true' == get_user_option( 'rich_editing' ) ) {
			add_filter( 'mce_external_plugins', 'mt_tabs_tinymce_plugin' );
			add_filter( 'mce_buttons', 'mt_tabs_register_mce_button' );
		}
	}
	
	add_action('admin_head', 'mt_tabs_mce_button');
	
	function mt_tabs_tinymce_plugin( $plugin_array ) {
		global $url;
		
		$plugin_array['mt_tabs_mce_button'] = $url.'assets/js/mt_tabs.js';
		return $plugin_array;
	}
	
	function mt_tabs_register_mce_button( $buttons ) {
		array_push( $buttons, 'mt_tabs_mce_button' );
		return $buttons;
	}
	
	function mt_tabs_scripts_init() {
		global $url;
		
		if(!is_admin()){
			$path_theme=get_template_directory();
			
			if (file_exists($path_theme.'/mt-tabs/mt_tabs_btstrp.js')) {
				$url_theme=get_template_directory_uri();
				wp_enqueue_script('mt_tabs_btstrp', $url_theme.'/mt-tabs/mt_tabs_btstrp.js',array('jquery'),'1.0',false);	
			}else{
				wp_enqueue_script('mt_tabs_btstrp', $url.'assets/js/mt_tabs_btstrp.js',array('jquery'),'3.2.0',false);				
			}
		}
		
	}

	add_action('wp_print_scripts', 'mt_tabs_scripts_init');

	function mt_tabs_stylesheet_init() {
		global $url;
		
		$path_theme=get_template_directory();
		
		if (file_exists($path_theme.'/mt-tabs/style.css')) {		
			$url_theme=get_template_directory_uri();
			wp_register_style('mt-tabs', $url_theme.'/mt-tabs/style.css', '', '1.0');
			wp_enqueue_style( 'mt-tabs');
		}else{
			wp_register_style('mt-tabs', $url.'assets/css/style.css', '', '1.0');
			wp_enqueue_style( 'mt-tabs');			
		}
	}

  	add_action('wp_print_styles', 'mt_tabs_stylesheet_init');

	function mtabs_shortcode( $atts, $content) {
	
		$at = shortcode_atts( array(
			'type' => 0,
		), $atts );
		
		static $count=0; $count++;
		
		$content = wpautop(trim($content));
		
		if($at['type']==2){
		
			$content=preg_replace('/<\\/?p>\[mtitle\](.*)\[\/mtitle\]<\/p>/i', '<div class="panel">
						<div class="panel-title"><a class="accordion-toggle" data-toggle="collapse-next" data-parent="#collapse_'.$count.'">$1</a></div>
						<div class="panel-collapse collapse">
							<div class="postint_cnt">', $content);
		
			$content=preg_replace('/<\\/?p>\[mtmore\]<\/p>/i', '</div></div></div>', $content);
		
		
			$content='<div class="collapse_cnt" id="collapse_'.$count.'">' .$content. '</div></div></div></div>';
		
			$content = preg_replace('/<div class="panel-title">/', '<div class="panel-title active">', $content, 1);
		
			$content = preg_replace('/<div class="panel-collapse collapse">/', '<div class="panel-collapse collapse in">', $content, 1);
		
			return $content;
	
		}else{
			
			$contentb=''; $list='';
			
			$check = preg_match_all("/<\\/?p>\[mtitle\](.*)\[\/mtitle\]<\/p>/", $content, $matches, PREG_SET_ORDER);
				
			for ($i = 0; $i <= $check-1; $i++) {
				$sum=$i+1;
				$sumb=$sum+1;
				if($sum==1){$class=' class="active"';}else{$class='';}
				$list.='<li'.$class.'><a href="#tbcn'.$count.'-'.$sum.'" data-toggle="tab">'.$matches[$i][1].'</a></li>';
				$content=preg_replace('/<\\/?p>\[mtmore\]<\/p>/', '</div><div class="tab-pane fade postint_cnt" id="tbcn'.$count.'-'.$sumb.'">', $content, 1);
			}
	
			$contentb.='
			<ul class="mt-tabs">
				'.$list.'
			</ul>
			';

			$content=preg_replace('/<\\/?p>\[mtitle\](.*)\[\/mtitle\]<\/p>/i', '', $content);
	
			$contentb.='<div class="mt_tabs tab-content" id="mt_tabs_'.$count.'">';
			
			$contentb.='<div class="tab-pane fade in active postint_cnt" id="tbcn'.$count.'-1">';
					
			$contentb.=$content;
			
			$contentb.='</div></div>';
			
			return $contentb;
	
		}
		
	}
	
	//add_shortcode('mtabs', 'mtabs_shortcode');

	function mt_tabs_pre_process_shortcode($content) {
		global $shortcode_tags;
	 
		// Backup current registered shortcodes and clear them all out
		$orig_shortcode_tags = $shortcode_tags;
		$shortcode_tags = array();
	 
			add_shortcode("mtabs","mtabs_shortcode");
	 
		// Do the shortcode (only the one above is registered)
		$content = do_shortcode($content);
	 
		// Put the original shortcodes back
		$shortcode_tags = $orig_shortcode_tags;
	 
		return $content;
	}
	add_shortcode("mtabs","mtabs_shortcode");
	 
	add_filter('the_content', 'mt_tabs_pre_process_shortcode', 7);
?>