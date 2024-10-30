(function() {
	tinymce.PluginManager.add('mt_tabs_mce_button', function( editor, url ) {
		editor.addButton( 'mt_tabs_mce_button', {
			text: 'MT Tabs',
			icon: false,
			type: 'menubutton',
			menu: [
				{
					text: editor.getLang('mtabstring.tabs'),
					onclick: function() {
						string = tinyMCE.activeEditor.selection.getContent().replace('[mtabs]', '').replace('[/mtabs]', '').replace('[mtabs type="2"]', '');
						string = string.replace(/(<p>\s<\/p>)/g, "");
						string = string.replace(/(<p><\/p>)/gi, '');
						editor.insertContent("[mtabs]"+string+"[/mtabs]");
					}
				},
				{
					text: editor.getLang('mtabstring.accordion'),
					onclick: function() {
						string = tinyMCE.activeEditor.selection.getContent().replace('[mtabs]', '').replace('[mtabs type="2"]', '').replace('[/mtabs]', '');
						string = string.replace(/(<p>\s<\/p>)/g, "");
						string = string.replace(/(<p><\/p>)/gi, '');
						editor.insertContent("[mtabs type=\"2\"]"+string+"[/mtabs]");
					}
				},
				{
					text: editor.getLang('mtabstring.title'),
					onclick: function() {
						string = tinyMCE.activeEditor.selection.getContent().replace('[mtitle]', '').replace('[/mtitle]','');
						string = string.replace(/(<p>\s<\/p>)/g, "");
						string = string.replace(/(<p><\/p>)/gi, '');
						editor.insertContent("[mtitle]"+string+"[/mtitle]");
					}
				},
				{
					text: editor.getLang('mtabstring.more'),
					onclick: function() {
						editor.insertContent("[mtmore]");
					}
				}
			]
		});
	});
})();