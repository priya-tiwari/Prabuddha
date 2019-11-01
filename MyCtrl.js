var app = angular.module('Prabuddha', ['ngCookies']);
app.controller('vm', vm)

function vm($scope, $timeout, $http, $cookies) {

    document.getElementById('menu_tag').click();
    var base_str = window.location.hostname;
    var Str = 'http://' + '10.21.66.179' + ':3000';

    if ($cookies.get('token') != undefined && $cookies.get('token') != null && $cookies.get('token') != null) {
        var authHeader={}
        if($cookies.get('token')){
            authHeader.Authorization='Bearer '+$cookies.get('token')
        }
        $http({
            method: "POST",
            url: Str + '/api/user/refresh',
            // data: $scope.params,
            headers: authHeader,
            // withCredentials: false
        }).then(function(response) {
            // ResponseCheck.ResponseStatus(response);
            $scope.login_data = response.data.user;
            console.log($scope.login_data);
            $scope.cook = response.data.user.token;
            $scope.hidels = 1;
            console.log($scope.login_data.name);
            // if(response.user[0].token != undefined );

        }).catch(function(response) {
        });
    }


    console.log(Str);
    $scope.caption = "";
    $scope.team = "";
    $scope.mem = [];
    $scope.show_login = 1;
    $scope.form_data = "";
    $scope.action = 0;
    $scope.contact_details = "";
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
            $("#change").click(function() {
                $("#change_pass").modal();
            });
        });
    });
    promise1.then(function(value) {
        $(document).ready(function() {
            $("#fmail").click(function() {
                $("#forget").modal();
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

    $scope.forgot_pass = function(){
        console.log($scope.fmail);
        $scope.forgot_mail = {  "users":{
            "email": $scope.fmail
        }}
        console.log($scope.forgot_mail);
        $http({
            method: "POST",
            url: Str + '/api/users/forget/',
            data: $scope.forgot_mail,
            // withCredentials: false
        }).then(function(response) {
            console.log(response);
          swal('New Password has been sent to your Email Id');

        }).catch(function(response) {

        });
    }

    $scope.change_pass = function(){
        var authHeader={}
        if($cookies.get('token')){
            authHeader.Authorization='Bearer '+$cookies.get('token')
        }
        console.log($scope.c_pass);
        console.log($scope.new_pass);
        // if($scope.c_pass != $scope.new_pass){
        //     swal("warning","Passwords do not match","warning");
        //     return;
        // }
        console.log();
        $scope.email1 = $scope.login_data.email;
        $scope.change_pass_data = {    "user":{
            'email': $scope.email1,
            'new_password':$scope.new_pass,
            'password':$scope.old_pass
        }
        };
        console.log($scope.change_pass_data);
        $http({
            method: "POST",
            url: Str + '/api/users/change/',
            data: $scope.change_pass_data,
            headers: authHeader

            // withCredentials: false
        }).then(function(response) {
            console.log(response);
          swal("success","Password Changed Successfully","success");

        }).catch(function(response) {

        });

    }

    $scope.login = function() {
        console.log($scope.email);
        if(!$scope.checkemail($scope.email))
        {
           swal("Email invalid","","warning");
           return;
        } 
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
            $scope.leader = $scope.login_data.name;
            $cookies.put('token', $scope.login_data.token);
            $scope.hidels = 1;
            // $scope.caption = 

            // if(response.user[0].token != undefined );
        }).catch(function(response) {
            console.log(response);
                if (response.status != 200) {
                    
                    swal("ERROR", "Email is already registered", "error");
                }
        });
    }

    $scope.checkemail = function(mail)
    {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(mail.toLowerCase());
    }

    $scope.logout = function() {
        $http({
            method: "POST",
            url: Str + '/api/logout/',
            // data: $scope.params,
            headers: {
                'Cookie': $cookies.get('token'),
            },
            // withCredentials: false
        }).then(function(response) {
            console.log(response);
            // ResponseCheck.ResponseStatus(response);
            $scope.login_data = response.data.user;
            console.log($scope.login_data)
            $cookies.put('token', $scope.login_data.token);
            $scope.cook = response.data.user.token;
            $scope.hidels = 0;
            // if(response.user[0].token != undefined );
        }).catch(function(response) {
        });
    }

    $scope.signup = function() {
        if(!$scope.checkemail($scope.Email))
        {
           swal("Email invalid","","warning");
           return;
        }
        // console.log($scope.number.length);
        // if($scope.number.length != 10){
        //     swal("error","INVALID PHONE NUMBER","error")
        //     return
        // }
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
            $scope.username = "";
            $scope.referal = "";
            $scope.password = "";
            $scope.number = 0;
            $scope.name = "";
            $scope.email = "";
            $scope.college = "";
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
                if ($scope.form_data.event_status == 'REGISTERED'|| $scope.form_data.event_status == 'APPROVED') {
                    $scope.action = 1;
                }
                console.log($scope.form_data);
                console.log($scope.action); 
            }
            $scope.head = "History and politics";
            $scope.contact_detail = "";
            $scope.about = "The curtain raiser is loaded with topics covering from Swadeshi Movement to Cold War, Battles all round the world and theories of the infamous assasinations.From the whom and who&#39;s of the political world to the Great Wall, you need to know it all to ace the pack of enthusiasts attending this quiz.";
        }
        if (k == 2) {
            if ($scope.hidels == 1) {
                $scope.form_data = $scope.login_data.events.sports;
                $scope.action = 0;
                $scope.event1 = "sports";
                if ($scope.form_data.event_status == 'REGISTERED' || $scope.form_data.event_status == 'APPROVED') {
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
                if ($scope.form_data.event_status == 'REGISTERED' || $scope.form_data.event_status == 'APPROVED') {
                    $scope.action = 1;
                }
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
                if ($scope.form_data.event_status == 'REGISTERED' || $scope.form_data.event_status == 'APPROVED') {
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
            authHeader.Authorization='Bearer '+$cookies.get('token')
        }
        $scope.x = {Authorization:$cookies.get('token')}
        console.log(authHeader);
        $http({
            method: "GET",
            url: Str + '/api/events/student',
            params:$scope.reg, 
            headers: authHeader,
            // withCredentials: false
        }).then(function(response) {
            $scope.students = response.data.stu;
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
        console.log(authHeader);
        $scope.reg = {
            'events': $scope.event1,
            'members': $scope.mem
        }
        console.log($scope.reg);
        $http({
            method: "POST",
            url: Str + '/api/events/register',
            data: $scope.reg,
            headers: authHeader,
            withCredentials: false
        }).then(function(response) {
            // ResponseCheck.ResponseStatus(response);
            console.log(response);
            $scope.login_data = response.data.user;
            swal("REGISTERED",'success')

        }).catch(function(response) {
            // ResponseCheck.ResponseStatus(response);
        });
    }

        $scope.approve = function(status) {
            console.log()
        var authHeader={}
        if($cookies.get('token')){
            authHeader.Authorization='Bearer '+$cookies.get('token')
        }
        // $scope.mem[0] = member;
        console.log(authHeader);
        $scope.status = {
            'events': $scope.event1,
            'approval_status':status
        }
        console.log($scope.status);
        $http({
            method: "POST",
            url: Str + '/api/events/approve',
            data: $scope.status,
            headers: authHeader,
            withCredentials: false
        }).then(function(response) {
            // ResponseCheck.ResponseStatus(response);
            console.log(response);
            $scope.login_data = response.data.user;
            swal("REGISTERED",'success')

        }).catch(function(response) {
            // ResponseCheck.ResponseStatus(response);
        });
    }



}