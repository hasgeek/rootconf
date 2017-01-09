// For conference and workshop schedule
//dateStr is expected in the format 2015-07-16", then returns "Thu Jul 16 2015"
function parseJson(e){var s=e.schedule,t=[],n=[],o=0,i=0;s.forEach(function(e,s,r){var a=[];r[s].date=getDateString(e.date),r[s].tableid="table-"+s,e.slots.forEach(function(e,t,n){var o=e.sessions;t===0&&(r[s].start=getIST(getTimeString(e.sessions[0].start))),t===n.length-1&&(r[s].end=getIST(getTimeString(e.sessions[o.length-1].end))),o.forEach(function(e,n){e.room==="mlr-convention-centre-j-p-nagar/auditorium"?r[s].type="conference":e.section_name&&e.section_name.toLowerCase().indexOf("workshop")!==-1?r[s].type="workshop":e.room==="teri-domlur/auditorium"&&(r[s].type="workshop"),e.room&&a.indexOf(e.room)===-1&&a.push(e.room),r[s].slots[t].sessions[n].start=getIST(getTimeString(e.start)),r[s].slots[t].sessions[n].end=getIST(getTimeString(e.end))}),r[s].type!=="workshop"&&(r[s].type="conference")}),a.sort(),a.forEach(function(e,s,t){t[s]={name:e,title:getAudiTitle(e),track:s}}),r[s].rooms=a,e.slots.forEach(function(e,t){var n=e.sessions;n.forEach(function(e,n){e.room&&(r[s].slots[t].sessions[n].track=getTrack(e.room,a),r[s].slots[t].sessions[n].roomTitle=getAudiTitle(e.room))})}),r[s].type==="conference"?(n.push({date:r[s].date,tableid:r[s].tableid,rooms:r[s].rooms,start:r[s].start,end:r[s].end}),createTable(n[o]),o+=1):(t.push({date:r[s].date,rooms:r[s].rooms,start:r[s].start,end:r[s].end}),createTable(t[i]),i+=1)}),o=0,i=0,s.forEach(function(e){e.slots.forEach(function(e){e.sessions.length>1&&e.sessions.sort(function(e,s){return e.track-s.track})}),e.type==="conference"?(pushSessions(n[o],e.slots),addRowSpan(n[o]),checkColumns(n[o]),o+=1):(pushSessions(t[i],e.slots),addRowSpan(t[i]),checkColumns(t[i]),i+=1)}),renderScheduleTable(n,"conference"),renderScheduleTable(t,"workshop")}var getDateString=function(e){var s=parseInt(e.substr(0,4),10),t=parseInt(e.substr(5,2),10)-1,n=parseInt(e.substr(8,2),10),o=new Date;return o.setFullYear(s,t,n),o.toDateString()},getTimeString=function(e){return e.substr(e.indexOf("T")+1,5)},getHrMin=function(e){var s=e.substring(0,e.indexOf(":")),t=e.substring(e.indexOf(":")+1);return[s,t]},getdateObject=function(e,s){var t=new Date;return t.setHours(e),t.setMinutes(s),t},toTimeString=function(e){return(10>e.getHours()?"0":"")+e.getHours()+":"+((10>e.getMinutes()?"0":"")+e.getMinutes())},getIST=function(e){var s=parseInt(getHrMin(e)[0],10)+5,t=parseInt(getHrMin(e)[1],10)+30,n=getdateObject(s,t);return ist=toTimeString(n)},createTable=function(e){var s,t,n,o,i;s=getHrMin(e.start)[0],t=getHrMin(e.start)[1],n=getdateObject(s,t),s=getHrMin(e.end)[0],t=getHrMin(e.end)[1],o=getdateObject(s,t),e.slots=[];do i=toTimeString(n),e.slots.push({slot:i,issession:!1,sessions:[],occupied:"empty"}),n.setMinutes(n.getMinutes()+5);while(o>=n)},getTotalMins=function(e){var s=parseInt(getHrMin(e)[0],10),t=parseInt(getHrMin(e)[1],10);return s*60+t},getAudiTitle=function(e){return e.substring(e.indexOf("/")+1).toUpperCase()},getTrack=function(e,s){var t;for(t=0;s.length>t;t++)if(s[t].name===e)return s[t].track},pushSessions=function(e,s){s.forEach(function(s){var t=s.sessions;t.forEach(function(s){var t=getTotalMins(s.start);getTotalMins(s.end),e.slots.forEach(function(e,n,o){getTotalMins(e.slot)===t&&(o[n].sessions.push(s),o[n].issession=!0)})})})},addRowSpan=function(e){e.slots.forEach(function(s,t,n){if(s.issession){(s.sessions[0].track===0||s.sessions[0].is_break)&&(s.occupied=0);var o=s.sessions;for(sessionindex=0;o.length>sessionindex;sessionindex++){var i=getTotalMins(o[sessionindex].end),r=t+1,a=1,c=!1;for(r=t+1;n.length>r;r++){if(n[r].issession===!0&&getTotalMins(n[r].sessions[0].start)>=i)break;n[r].issession===!0&&i>getTotalMins(n[r].sessions[0].start)&&(c=!0,a+=1)}c&&(e.slots[t].sessions[sessionindex].rowspan=a)}}})},checkColumns=function(e){for(var s=0;e.slots.length>s;s++)if(e.slots[s].issession&&e.slots[s].occupied!==0){var t=!1;for(j=s-1;j>0;j--)e.slots[j].issession&&getTotalMins(e.slots[j].sessions[0].end)>getTotalMins(e.slots[s].sessions[0].start)&&(t=!0);if(t===!1){var n=parseInt(getHrMin(e.slots[s].sessions[0].start)[0],10),o=parseInt(getHrMin(e.slots[s].sessions[0].start)[1],10)+5,i=getdateObject(n,o),r=toTimeString(i);e.slots[s].sessions[1]=e.slots[s].sessions[0],e.slots[s].sessions[0]={track:"empty",start:e.slots[s].sessions[1].start,end:r}}}},renderResponsiveTable=function(){$("td.tab-active").attr("colspan",2)},disableResponsiveTable=function(){$("td").not(".centered").attr("colspan","")},renderScheduleTable=function(e,s){e.forEach(function(e){var t=$("#scheduletemplate").html();if(s==="conference")$("#conferenceschedule").append(Mustache.render(t,e)),$(".schedule-table-container p.loadingtxt").hide();else if($("#workshopschedule").length){var n=$("#workshopschedule").attr("data-date");n=n.split("-");var o=e.date.substr(8,2);n.indexOf(o)>-1&&($("#workshopschedule").append(Mustache.render(t,e)),$(".schedule-table-container p.loadingtxt").hide())}}),768>$(window).width()&&renderResponsiveTable()};$(document).ready(function(){if($("#nav-home").length)var e=$("#nav-home").offset().top;$(window).scroll(function(){$("#nav-home").length&&($(this).scrollTop()>e?$("#nav-home").addClass("navbar-fixed-top"):$("#nav-home").removeClass("navbar-fixed-top"))}),$(".smooth-scroll").click(function(e){e.preventDefault();var s=$(this).attr("href"),t=$(""+s).offset().top-$(".site-navbar").height();$("html,body").animate({scrollTop:t},"900")}),initLeaflets();var s="https://rootconf.talkfunnel.com/2016/schedule/json";($("#conferenceschedule").length||$("#workshopschedule").length)&&$.ajax({type:"GET",dataType:"jsonp",url:s,success:function(e){parseJson(e)}}),$(window).resize(function(){768>$(window).width()?renderResponsiveTable():disableResponsiveTable()}),$("#conferenceschedule, #workshopschedule").on("click","table td .js-expand",function(){$(this).hasClass("fa-caret-right")?($(this).removeClass("fa-caret-right").addClass("fa-caret-down"),$(this).parents("td").find(".description-text").slideDown()):($(this).removeClass("fa-caret-down").addClass("fa-caret-right"),$(this).parents("td").find(".description-text").slideUp())}),$("#conferenceschedule, #workshopschedule").on("click","table th.track0, table th.track1, table th.track2",function(){if(768>$(window).width()){var e=$(this).parents("table"),s=$(this).attr("data-td");e.find(".tab-active").removeClass("tab-active"),$(this).addClass("tab-active"),e.find("."+s).addClass("tab-active"),renderResponsiveTable()}}),$(".button").click(function(){var e=$(this).html(),s=$(this).attr("href");sendGA("click",e,s)}),$(".click").click(function(){var e=$(this).data("target"),s=$(this).data("label");sendGA("click",s,e)})});