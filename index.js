function onLoad(){
    //Parallax
    document.documentElement.style.setProperty('--mouseX',0.5);
    document.documentElement.style.setProperty('--mouseY',0.5);
    document.documentElement.addEventListener("mousemove", e => {
        let width = document.documentElement.offsetWidth; 
        let height = document.documentElement.offsetHeight;
        document.documentElement.style.setProperty('--mouseX',e.clientX/width);
        document.documentElement.style.setProperty('--mouseY',e.clientY/height);
    });
    function timepassing(tick){
        document.documentElement.style.setProperty('--ticksX',Math.sin(tick));
        document.documentElement.style.setProperty('--ticksY',Math.cos(tick));
        setTimeout(timepassing, 16, tick+0.01);
    }
    timepassing(0)

    //Clicking the Links
    var items = document.getElementsByClassName("list_item");
    for (item of items){
        let link=item.getAttribute('link');
        if (link)
            item.onclick = function() {
                window.open(link, '_blank');
            };
    };

    //Jumping to Headers
    let link_parts= window.location.href.split('#');
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, document.getElementById(link_parts[1]).offsetHeight);
}

			