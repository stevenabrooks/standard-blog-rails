var mem;
var layi;
$.getJSON('members.json',function(data){
    mem=data;
    getMembers();
});

function getDocHeight() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}
function getDocWidth() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
        Math.max(D.body.offsetWidth, D.documentElement.offsetWidth),
        Math.max(D.body.clientWidth, D.documentElement.clientWidth)
    );
}


function cCount(_obj){
    var c;
    var i = 0;
    for(m in _obj){
        i=i+1;
    }
    c=i;
    return c;
}

function fixLayout(){

    $('.content')[0].offsetHeight=getDocHeight()+'px';
    var mpd = $('.foot')[0].offsetHeight+100+'px';
    var olf = $('.sidebar')[0].offsetWidth+'px';
    $('.memlist').css('padding-bottom',mpd);
    $('.foot').css('left',olf);
    $('.content').css('padding-top',$('.foot')[0].offsetHeight+20+'px');
}

//Generate Members in SideBar
function getMembers(){
    for(m in mem){
        var picurl = "";
        picurl = "img/"+mem[m]['memKey']+'.png';
        var pic = $('<div>').addClass('pic').css('background-image',"url("+picurl+")");
        var info = $('<div>').addClass('info').append(
                $('<h5>').html(mem[m]['name']),
                $('<h6>').addClass('t-white').html("<i class='icon-white icon-user'></i> "+mem[m]['post'])
            );
        var member = $('<li>').append(pic).attr('memKey',mem[m]['memKey']).addClass('member').addClass('borbox').append(info);
        $('.memlist').append(member);
    }
}

function socialize(_memKey){
    var m = mem[_memKey];
    $('.social .fb a').attr('href',m['socialLinks']['fb']).parent().hide().fadeIn();
    $('.social .twitter a').attr('href',m['socialLinks']['twitter']).parent().hide().fadeIn();
    $('.social .gplus a').attr('href',m['socialLinks']['gplus']).parent().hide().fadeIn();
    $('li.phone a').html("<i class='icon-white icon-home'></i> "+m['contact']['tel']);
    $('li.email a').html("<i class='icon-white icon-envelope'></i> "+m['contact']['email']);
    $('li.resume a').attr('href',m['contact']['resume']);
}


function getDetails(_memKey){
    var mk = mem[_memKey];
    $('#memName').text(mk['name']).hide().fadeIn();
    $('#memPost').text(mk['post']).hide().fadeIn();
    socialize(_memKey);
    $('.about .aboutC').text(mk['aim']);
    //skills
    for(s in mk['skills']){
        var i=0;
        var cat = s;
        var ar = mk['skills'][s];
        while(i<ar.length){
            var li = $('<li>').text(ar[i]);
            if(cat=='os'){
                $(li).addClass('os');
            }
            if(cat=='langs'){
                $(li).addClass('langs');
            }
            if(cat=='softs'){
                $(li).addClass('softs');
            }
            $('.proC').append(li);
            i++;
        }
    }
    //projects-interns
    for(p in mk['projectsinterns']){
        var _dd = document.createElement('dd');
        var _dt = document.createElement('dt');
        $(_dt).text(p);
        $(_dd).text(mk['projectsinterns'][p]);
        $('.projC').append(_dt).append(_dd);
        console.log('Done');
    }
    //education
    var i=0;
    while(i<mk['education'].length){
        var li = $('<li>').text(mk['education'][i]);
        $('.eduC').append(li);
        i++;
    }
    //achievements
    i=0;
    while(i<mk['achievements'].length){
        var li = $('<li>').text(mk['achievements'][i]);
        $('.achiC').append(li);
        i++;
    }
    animateContent();
}


//Handles General Animations
function animateContent(){
    $('.aboutC').hide();
    $('.eduC').hide();
    $('.proC').hide();
    $('.projC').hide();
    $('.achiC').hide();

    $('.aboutC').fadeIn();
    $('.projC').fadeIn();
    $('.proC').fadeIn();
    $('.eduC').fadeIn();
    $('.achiC').fadeIn();
}

//Reset Member Content
function resetMem(){
    $('.aboutC').empty();
    $('.proC').empty();
    $('.eduC').empty();
    $('.projC').empty();
    $('.achiC').empty();
}


$(document).ready(function(){


$(window).load(function(){
    fixLayout();
});

$(window).resize(function(){
    fixLayout();
});

$('.member').live("click",function(){
    resetMem();
    fixLayout();
    var ac = $('.member.show')[0];
    var t = $(this);
    $(ac).removeClass('show');
    $(t).addClass('show');
    getDetails($(this).attr('memKey'));
});


$("a[rel='tooltip']").hover(function(){
    $(this).tooltip({
        placement: 'bottom',
        trigger: 'hover',
    });
    $(this).tooltip('show');
});


$('.head').live("click",function(){
    $(this).next().slideToggle(200);
});





});