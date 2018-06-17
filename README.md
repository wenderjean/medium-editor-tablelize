# MediumEditor Tablelize

MediumEditor Tablelize is an extension to allow users to transform content on table to [MediumEditor](https://github.com/yabwe/medium-editor).

## Usage

On your app, link the style and the script and initialize MediumEditor with the table extension:

```html
<!doctype html>
<html>
<head>
...
  <link rel="stylesheet" href="<path_to_medium-editor>/dist/css/medium-editor.css" />
  <link rel="stylesheet" href="<path_to_medium-editor>/dist/css/themes/default.css" />
  <link rel="stylesheet" href="<path_to_medium-editor-tablelize>/dist/css/medium-editor-tablelize.css" />
...
</head>
<body>
  <div class="editable"></div>

  <script type="text/javascript" src="<path_to_medium-editor>/dist/js/medium-editor.js"></script>
  <script type="text/javascript" src="<path_to_medium-editor-tablelize>/dist/js/medium-editor-tablelize.js"></script>

  <script type="text/javascript" charset="utf-8">
    var editor = new MediumEditor('.editable', {
    buttonLabels: 'fontawesome',
    extensions: {
      tablelize: new MediumEditorTablelize()
    },
    toolbar: {
      buttons: [
        'h2',
        'bold',
        'italic',
        'tabelize'
      ],
      static: true,
      sticky: true
    }
  });
  </script>
</body>
</html>
```

## License
The extension is based on the following project: [https://github.com/yabwe/medium-editor-tables](https://github.com/yabwe/medium-editor-tables)
