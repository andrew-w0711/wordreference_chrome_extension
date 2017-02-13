(function(window, jQuery) {
	
    var $head = $("head");
    var css_url = chrome.extension.getURL('assets/css/wordpreference_chrome_extension.css');
    var $css = "<link href=" + css_url +" rel='stylesheet'>";
    $head.append($css);
    
    $css = "<link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet'>";
    $head.append($css);
    
	if($("#accentSelection").length > 0){
        var list_items = [];
        $("#accentSelection option").each(function(index){
            var title = $(this).attr('title');
            if(title.indexOf('pronunciation') > -1 ){
                title = title.split('pronunciation')[0].trim();
            } else {
                if(title.indexOf('Pronunciation') > -1){
                    title = title.split('Pronunciation')[0].trim();
                }
            }
            list_items.push(title);
        });
        $("#accentSelection").hide();
        
        $("#listen_widget").after("<ul class='pronon_from_CE'></ul>");
        
        list_items.forEach(function(item, index){
            $("ul.pronon_from_CE").append('<li><i class="fa fa-play" aria-hidden="true"></i><span value=' + index + '>' + item + '</span><i class="fa fa-clipboard" aria-hidden="true" data-clipboard-target="#clipboard"></i></li>');
        });
        
    }
    
    $(document).on('click', 'ul.pronon_from_CE li i.fa-play', function(){
        var index = $(this).next().attr('value');
        $("audio#aud" + index).trigger("play");
    });
    
    $(document).on('click', 'ul.pronon_from_CE li i.fa-clipboard', function(){
        var index = $(this).prev().attr('value');
        var url = window.location.hostname + $("audio#aud" + index).find("source").attr('src');
        
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(url).select();
        document.execCommand("copy");
        $temp.remove();        
    });
    
})(window, $)