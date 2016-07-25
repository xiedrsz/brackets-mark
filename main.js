define(function (require, exports, module) {
    'use strict';

    // get the bracket module
    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus = brackets.getModule("command/Menus"),
        EditorManager = brackets.getModule("editor/EditorManager");

    // declare the command option
    var COMMAND_ID = "xiedr.find.makeamark",
        COMMAND_NAME = "Make A Mark",
        command = {
            key: 'Ctrl-Shift-M',
            platform: 'win'
        };

    // insertCss into document
    function insertCss(css) {
        var elem = document.createElement('style');
        elem.setAttribute('type', 'text/css');

        if ('textContent' in elem) {
            elem.textContent = css;
        } else {
            elem.styleSheet.cssText = css;
        }

        var head = document.getElementsByTagName('head')[0];
        head.appendChild(elem);
    };
    insertCss('.xie-marker { color: red !important; text-decoration: underline !important; }');

    // make a mark at the selection
    function mark() {
        var editor = EditorManager.getCurrentFullEditor(),
            results = editor.getSelections(),
            cm = editor._codeMirror,
            start, end;

        results.forEach(function (position) {
            start = position.start;
            end = position.end;
            cm.markText(start, end, {
                className: 'xie-marker'
            });
        });
    }

    // register the command
    CommandManager.register(COMMAND_NAME, COMMAND_ID, mark);

    // register a command in the findMenu
    var findMenu = Menus.getMenu(Menus.AppMenuBar.FIND_MENU);
    findMenu.addMenuItem(COMMAND_ID, command);
});
