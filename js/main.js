$(function () {

    var jsMirrorElement = $('#codemirror-js').get(0);
    if (jsMirrorElement) {
        var jsMirror = window.jsmc = window.CodeMirror.fromTextArea(jsMirrorElement, {
            mode: 'javascript',
            theme: 'monokai',
            indentUnit: 4,
            lineNumbers: true,
            gutters: ["CodeMirror-lint-markers"],
            lint: {
                options: window.JSHINT_CONFIG
            }
        });
    }

    var htmlMirrorElement = $('#codemirror-html').get(0);
    if (htmlMirrorElement) {
        var htmlMirror = window.jsmc = window.CodeMirror.fromTextArea(htmlMirrorElement, {
            mode: 'xml',
            theme: 'monokai',
            indentUnit: 4,
            lineNumbers: true
        });
    }

    var cssMirrorElement = $('#codemirror-css').get(0);
    if (cssMirrorElement) {
        var cssMirror = window.jsmc = window.CodeMirror.fromTextArea(cssMirrorElement, {
            mode: 'css',
            theme: 'monokai',
            indentUnit: 4,
            lineNumbers: true
        });
    }

    var iframe = $("#output").get(0);

    $("#run").on('click', function () {
        var js = jsMirror ? jsMirror.getValue() : '';
        var html = htmlMirror ? htmlMirror.getValue() : '';
        var css = cssMirror ? cssMirror.getValue() : '';

        iframe.contentWindow.document.open('text/html', 'replace');
        iframe.contentWindow.document.write(getPageContent(css, js, html));
        iframe.contentWindow.document.close();
    });

});


var getPageContent = function (css, js, html) {

    var header = "<!DOCTYPE html><html><head></head><body>";
    var preScript = '<script>window.console = window.top.console;</script><script src="/js/libs/zepto.js"></script>';
    var script = '<script type="text/javascript">' + (js ? js : '') + '</script>';
    var style = '<style type="text/css">' + (css ? css : '') + '</style>';
    var footer = '</body></html>';

    return header + html + preScript + script + style + footer;
};
