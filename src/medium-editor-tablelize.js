var MediumEditorTablelize = MediumEditor.Extension.extend({
  name: 'tablelize',

  tagNames: ['table'],
  contentDefault: 'TBL',
  contentFA: '<i class="fa fa-table"></i>',

  init: function () {
    MediumEditor.Extension.prototype.init.apply(this, arguments);
    
    this.button = this.document.createElement('button');
    this.button.classList.add('medium-editor-action');
    this.button.innerHTML = this.base.options.buttonLabels === 'fontawesome'
                            ? this.contentFA
                            : 'tbl';

    this.on(this.button, 'click', this.handleClick.bind(this));
  },

  /**
   * returns a clone of the selection content
   * @returns {Contents}
   */
  getSelection: function () {
    return MediumEditor.selection
                       .getSelectionRange(this.document)
                       .cloneContents();
  },

  /**
   * replaces the selection with new html
   * @param {string} html
   */
  replaceSelectionHtml: function (html) {
    if (!html) {
      return;
    }
    
    var fragment = '';
    var range = MediumEditor.selection.getSelectionRange(this.document);
    var selection = this.document.getSelection();
      
    range.deleteContents();
    fragment = range.createContextualFragment(html);
    range.insertNode(fragment);

    selection.removeAllRanges();
  },

  /**
   * @param {string} content
   * @returns {element} table
   */
  generateTable: function(content) {
    var columns = Array.from(content.children).map(function(el) {
      var cells = el.textContent.split("\t");
      
      return cells.map(function(cell) {
        return '<td>' + cell + '</td>';
      });
    });

    var rows = columns.map(function(row) {
      return '<tr>' + row.join('') + '</tr>';
    });

    if (columns.length === 0 || rows.length === 0) {
      return false;
    }

    return '<table class="medium-editor-table" id="medium-editor-table" width="100%" border="1">' +
           '<tbody>'
           + rows.join('') +
           '</tbody>' +
           '</table>' + this.newLine();
  },

  /**
   * @returns {Element} new line element
   */
  newLine: function() {
    return '<p><br></p>';
  },

  /**
   * set focus
   */
  setFocus: function() {
    debugger;
    if (this.getEditorElements()[0].children.length === 0) {
      return;
    }

    var elements = this.getEditorElements()[0].children;
    var lastElement = elements[elements.length - 1];

    this.base.selectElement(lastElement);
    MediumEditor.selection.clearSelection(document, true);
  },

  /**
   * @returns {Element} menu button
   */
  getButton: function () {
    return this.button;
  },

  handleClick: function (event) {
    event.preventDefault();
    event.stopPropagation();

    var content = this.getSelection();
    var table = this.generateTable(content);

    this.replaceSelectionHtml(table);
    this.setFocus();

    this.base.checkContentChanged();
  }
});
