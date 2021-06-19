function getUserLocation(){
    if(!navigator.geolocation){
        alert('Geolocation tidak didukung, gunakan browser lain');
    }else{
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function getPrayerTimes(latitude, longitude){
    fetch('http://api.aladhan.com/v1/calendar?latitude='+latitude+'&longitude='+longitude+'&method=4')
    .then(res => res.json())
    .then(function(res){
        let date = new Date();
        let today = date.getDate() - 1;
        let data = res.data[today].timings;
        
        let app = document.getElementById('app')
        let table = document.createElement('table');
        let tbody = document.createElement('tbody');

        for(i in data){
            let row = tbody.insertRow();
            let name = row.insertCell(0);
            let time = row.insertCell(1);
            name.innerHTML = i;
            time.innerHTML = data[i];
            tbody.appendChild(row);
        }
        table.appendChild(tbody);
        app.appendChild(table);
    })
}

function success(position){
    getPrayerTimes(position.coords.latitude, position.coords.longitude);
}

function error(){
    getPrayerTimes('-6.21462', '106.84513');
}

function index(){
    let app = document.getElementById('app');
    let h3 = document.createElement('h3');
    h3.innerHTML = 'Prayer Times';

    app.appendChild(h3);
    getUserLocation();
}

index();