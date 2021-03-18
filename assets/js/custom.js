$(function(){
    filterContent();
    //Get Filter Datas
    $.ajax({
        url: '../assets/data/filters.json',
        dataType: 'json',
        method: 'get',
        success: function (result) {
            var yearContent = "";
            var statusContent = "";
            $.each(result, function (key, value) {
                $.each(value.yearsFilter, function (key, value1) {
                    yearContent += '<div class="column text-center">';
                    yearContent += '<p><span class="filter-btn" id="'+ value1.year +'" onclick="yearFilterData('+ value1.year +')">'+ value1.year +'</span></p>';
                    yearContent += '</div>';
                });
                // $.each(value.statusFilter, function (key, value1) {
                //     statusContent += '<div class="column text-center">';
                //     statusContent += '<p><span class="filter-btn" id="'+ key +'" onclick="filterData('+ value1.status +')">'+ value1.status +'</span></p>';
                //     statusContent += '</div>';
                // });
            });
            $('.year-filter').empty();
            $('.year-filter').append(yearContent);

            // $('.status-filter').empty();
            // $('.status-filter').append(statusContent);
        },
        error: function (result) {
            alert(result);
        }
    });
    //Clear Filter
});
var year = "";
var tempYear = "";
var launch_success = "";
var tempLaunch = "";
var landing_success = "";
var tempLanding = "";
function yearFilterData(yearData){
    if(tempYear != ""){
        $("#" + tempYear).removeClass("colorChanged");
    }
    year = yearData;
    
    if(tempYear != year){
        $("#" + year).addClass("colorChanged");
    }else{
        $("#" + year).removeClass("colorChanged");
    }

    if(tempYear != year){
        year = yearData;
    }else{
        year = "";
    }
    tempYear = yearData;
    filterContent();
}

function launchFilterData(launchData){
    if(tempLaunch == "true" && tempLaunch != launchData || tempLaunch == "false" && tempLaunch != launchData){
        $("#launch_" + tempLaunch).removeClass("colorChanged");
    }
    if($("#launch_" + launchData).hasClass("colorChanged")){
        $("#launch_" + launchData).removeClass("colorChanged");
        launch_success = "";
    }else{
        $("#launch_" + launchData).addClass("colorChanged");
        launch_success = launchData;
    }
    tempLaunch = launchData;
    filterContent();
}

function landingFilterData(landingData){
    if(tempLanding == "true" && tempLanding != landingData || tempLanding == "false" && tempLanding != landingData){
        $("#landing_" + tempLanding).removeClass("colorChanged");
    }
    if($("#landing_" + landingData).hasClass("colorChanged")){
        $("#landing_" + landingData).removeClass("colorChanged");
        landing_success = "";
    }else{
        $("#landing_" + landingData).addClass("colorChanged");
        landing_success = landingData;
    }
    tempLanding = landingData;
    filterContent();
}

function clearFilter(){
    $(".left-container").find(".colorChanged").removeClass("colorChanged");
    year = "";
    landing_success = "";
    launch_success = "";
    filterContent()
}

//Get Content
function filterContent(){
    $.ajax({
        url: 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success='+ launch_success +'&land_success=' + landing_success +'&launch_year=' + year,
        dataType: 'json',
        method: 'get',
        success: function (result) {
            var rightContent = "";
            $.each(result, function (key, value) {
                rightContent += '<div class="right-side-single">';
                rightContent += '<div class="bg-white">';
                rightContent += '<img src='+ value.links.mission_patch_small +' alt="">';
                rightContent += '<h4>'+ value.mission_name + ' #' + value.flight_number +'</h4>';
                rightContent += '<p>Mission Ids:</p>';
                rightContent += '<ul>';
                $.each(value.mission_id, function (key, value) {
                    rightContent += '<li>' + value + '</li>';
                });
                rightContent += '</ul>';
                rightContent += '<p>Launch Year: '+ value.launch_year +'</p>';
                rightContent += '<p>Successful Launch: '+ value.launch_success +'</p>';
                rightContent += '<p>Successful Landing: '+ value.launch_success +'</p>';
                rightContent += '</div>';
                rightContent += '</div>';
            });
            rightContent += '<div class="dev-name text-center"><p><span>Developer by:</span> Venkatesh</p></div>';
            $('.right-container').empty();
            $('.right-container').append(rightContent);
            
        },
        error: function (result) {
            alert(result);
        }
    });

    
}