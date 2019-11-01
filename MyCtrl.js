var app = angular.module('Prabuddha', ['ngCookies']);
app.controller('vm', vm)

function vm($scope, $timeout, $http, $cookies) {

    if ($cookies.get('token') != undefined && $cookies.get('token') != null && $cookies.get('token') != null) {
        $http({
            method: "GET",
            url: Str + '/api/user',
            // data: $scope.params,
            headers: {
                'Cookie': $cookies.get('token'),
            },
            withCredentials: true
        }).then(function(response) {
            console.log(response);
            // ResponseCheck.ResponseStatus(response);
            $scope.login_data = response.data.user;
            console.log($scope.login_data);
            $scope.cook = response.data.user.token;
            $scope.hidels = 1;
            // if(response.user[0].token != undefined );

        }).catch(function(response) {
            // ResponseCheck.ResponseStatus(response);
            //    if(response != null || response != undefined){
            //     if (response.status != 200) {
            //         alert('');
            //         $scope.errors = response.data.errors;
            //         console.log($scope.errors[Object.keys($scope.errors)[0]]);
            //         $scope.d = Object.keys($scope.errors)[0];
            //         console.log();
            //         $scope.e = $scope.d.toUpperCase() + " " + $scope.errors[Object.keys($scope.errors)[0]].toUpperCase();
            //         console.log($scope.e);
            //         swal("ERROR", $scope.e, "error");
            //     }
            // }
        });
    }


    document.getElementById('menu_tag').click();
    var base_str = window.location.hostname;
    var Str = 'http://' + '10.21.66.16' + ':3000';

    console.log(Str);
    $scope.caption = "";
    $scope.team = "";
    $scope.mem = [];
    $scope.show_login = 1;
    $scope.form_data = "";
    $scope.action = "";
    $scope.hidels = 0;
    $scope.event1 = ""
    $scope.username = "";
    $scope.referal = "";
    $scope.password = "";
    $scope.number = 0;
    $scope.name = "";
    $scope.email = "";
    $scope.college = "";

    var promise1 = new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve('foo');
        }, 300);
    });


    $http({
        method: "GET",
        url: Str + '/api/events/college/',
        withCredentials: false
    }).then(function(response) {
        $scope.colleges = response.data.college;
    }).catch(function(response) {});

    promise1.then(function(value) {
        $(document).ready(function() {
            $("#myBtn").click(function() {
                $("#Login_Sign_up").modal();
            });
        });
    });

    promise1.then(function(value) {
        $(document).ready(function() {
            $("#port").click(function() {
                $("#Description").modal();
            });
        });
    });

    $scope.login = function() {
        $scope.params = {
            "user": {
                'email': $scope.email,
                'password': $scope.pass
            }
        };
        console.log($scope.params);
        $http({
            method: "POST",
            url: Str + '/api/users/login/',
            data: $scope.params,
            headers: {
                'Cookie': $cookies.get('token'),
            },
            withCredentials: false
        }).then(function(response) {
            console.log(response);
            // ResponseCheck.ResponseStatus(response);
            $scope.login_data = response.data.user;
            console.log($scope.login_data)
            $cookies.put('token', $scope.login_data.token);
            $scope.cook = response.data.user.token;
            $scope.hidels = 1;
            // if(response.user[0].token != undefined );
        }).catch(function(response) {
            // ResponseCheck.ResponseStatus(response);
            //    if(response != null || response != undefined){
            //     if (response.status != 200) {
            //         alert('');
            //         $scope.errors = response.data.errors;
            //         console.log($scope.errors[Object.keys($scope.errors)[0]]);
            //         $scope.d = Object.keys($scope.errors)[0];
            //         console.log();
            //         $scope.e = $scope.d.toUpperCase() + " " + $scope.errors[Object.keys($scope.errors)[0]].toUpperCase();
            //         console.log($scope.e);
            //         swal("ERROR", $scope.e, "error");
            //     }
            // }
        });
    }

    $scope.logout = function() {
    }

    $scope.signup = function() {
        if ($scope.Name == undefined || $scope.Name == null) {
            // swal("ERROR","Name Cant")
        }
        $scope.data = {
            "user": {
                "name": $scope.Name,
                "email": $scope.Email,
                "password": $scope.Password,
                "college": $scope.college,
                "mobile": $scope.number,
                "referal": $scope.referal
            }
        };
        console.log($scope.data);
        $http({
            method: "POST",
            url: Str + '/api/users/',
            data: $scope.data,
            withCredentials: false
        }).then(function(response) {
            // ResponseCheck.ResponseStatus(response);
            // $log.log(response);
        }).catch(function(response) {
            if (response.status == 422) {
                swal("WARNING", "Email is already registered", "warning");
            }
        });
    }

    $scope.Event_Description = function(k) {

        $scope.event = k;
        if (k == 1) {
            if ($scope.hidels == 1) {
                $scope.form_data = $scope.login_data.events.history;
                $scope.event1 = "history";
                $scope.action = 0;
                if ($scope.form_data.event_status == 'REGISTERED') {
                    $scope.action = 1;
                }
                console.log($scope.form_data);
            }
            $scope.head = "History and politics";
            $scope.about = "The curtain raiser is loaded with topics covering from Swadeshi Movement to Cold War, Battles all round the world and theories of the infamous assasinations.From the whom and who&#39;s of the political world to the Great Wall, you need to know it all to ace the pack of enthusiasts attending this quiz.";
        }
        if (k == 2) {
            if ($scope.hidels == 1) {
                $scope.form_data = $scope.login_data.events.sports;
                $scope.action = 0;
                $scope.event1 = "sports";
                if ($scope.form_data.event_status == 'REGISTERED') {
                    $scope.action = 1;
                }
            }
            $scope.head = "Sports Quiz";
            $scope.about = "If it is in the V, it is in the Tree. If it is in the arc it is out of the park.And if it is about sports then it should be known to you.Revise the knowledge about the records of Messi, the famous inspirational moments and get to the venue to show that you are a true sports person.";
        }
        if (k == 3) {
            if ($scope.hidels == 1) {
                $scope.form_data = $scope.login_data.events.entertainment;
                $scope.action = 0;
                $scope.event1 = "entertainment";
                if ($scope.form_data.event_status == 'REGISTERED') {}
                $scope.regis = 1;
            }
            $scope.head = "Entertainment Quiz";
            $scope.about = "This fall, let your leisure win you treasure! Tickle your grey matter and let your mind wander in the terrains imagination. Get your tickets done on time and have a bucket full of preparation then lay back in your seat and enjoy question in 3D.Just look out for some Easter eggs and do notice those cameos! Stay back for end credits and collect prizes!";
        }
        if (k == 4) {
            if ($scope.hidels == 1) {
                $scope.form_data = $scope.login_data.events.history;
                $scope.action = 0;
                $scope.event1 = "history";
                if ($scope.form_data.event_status == 'REGISTERED') {
                    $scope.action = 1;
                }
            }
            $scope.head = "General Quiz";
            $scope.about = "The most appealing and funda based quiz which will force you to think to the very core of your mind. Questions from in between the newspapers to various social media feeds, this will include the most general aspects which we see and still ignore. So if you can comply with Julius Caeser&#39;s &#39;Veni Vidi Vici&#39;, step up and own the center stage.";
        }

        console.log($scope.event1);
        $scope.reg = {
            'event_name': $scope.event1
        }
        var authHeader={}
        if($cookies.get('token')){
            alert()
            authHeader.Authorization='Bearer '+$cookies.get('token')
        }
        $scope.x = {Authorization:$cookies.get('token')}
        console.log(authHeader);
        $http({
            method: "GET",
            url: Str + '/api/events/student',
            params:$scope.reg, 
            headers: authHeader,
            withCredentials: false
        }).then(function(response) {
            // ResponseCheck.ResponseStatus(response);
            console.log(response);
            // vm.login_data = response.data.user;

        }).catch(function(response) {
            // ResponseCheck.ResponseStatus(response);
        });
        // console.log($scope.event1);

        // $http({
        //     method: "POST",
        //     url: Str + '/api/events/student',
        //     // data: $scope.reg,
        //     headers: {
        //         'Cookie': $cookies.get('token'),
        //     },
        //     withCredentials: true
        // }).then(function(response) {
        //     // ResponseCheck.ResponseStatus(response);
        //     console.log(response);
        //     // vm.login_data = response.data.user;

        // }).catch(function(response) {
        //     // ResponseCheck.ResponseStatus(response);
        // });

    }

    $scope.register = function(member, eve) {
        var authHeader={}
        if($cookies.get('token')){
            authHeader.Authorization='Bearer '+$cookies.get('token')
        }
        $scope.mem[0] = member;
        // console.log($scope.mem);
        $scope.reg = {
            'events': eve,
            'members': $scope.mem
        }
        // console.log(authHeader);
        $http({
            method: "POST",
            url: Str + '/api/events/register',
            data: $scope.reg,
            headers: authHeader,
            withCredentials: true
        }).then(function(response) {
            // ResponseCheck.ResponseStatus(response);
            console.log(response);
            vm.login_data = response.data.user;

        }).catch(function(response) {
            // ResponseCheck.ResponseStatus(response);
        });
    }



}