// To use this, comment the .coffee version and uncomment this one

angular.module('%module%.landing')
    .controller('LandingCtrl', function ($scope, $http) {

        $scope.users = [];
        $scope.availableRoles = ['USER', 'EDITOR', 'ADMIN'];
        $scope.enabled = false;

        $http.get('data/users.csv')
            .then(function (res) {
                $scope.users = Papa.parse(res.data, {
                    header: true,
                    delimiter: ',',
                    dynamicTyping: true,
                    skipEmptyLines: true
                }).data;
            });

        $scope.getUserInitials = function (user) {
            return user.firstname.match(/\b([a-zA-Z])/g).slice(0, 2).join('') + user.lastname.trim().charAt(0);
        };

        $scope.checkRoles = function (item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.updateRoles = function (item, list) {
            list = (list === '') ? [] : list.split(';');
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }

            return (list === []) ? '' : list.join(';');
        };

    });
