angular.module('AppName')
.controller('angularController', [
    '$scope', '$filter', '$stateParams', '$state', '$q', 'otherApplicationService',
    function ($scope, $filter, $stateParams, $state, $q, otherApplicationService) {
        //#region Constants
        var FormatString = "mm/dd/yyyy";
        //#endregion

        //#region Private Variables
        var descriptiveNameFlag = false;
        var descriptiveNameCollection = [];
        //#endregion

        //#region Public API
        // $scope variable instantiations/initializations
        $scope.descriptiveNameModel = {};

        // Add functions to scope in one place to give an overview of the functionality
        $scope.getMyData = getMyData;
        $scope.saveMyData = saveMyData;

        // Hook up any events
        $rootScope.$on('someRootAction', onSomeRootAction);
        $scope.$on('someAction', onSomeAction);
        //#endregion

        //#region Init Function
        // Init is the first defined funtion
        function init() {
            // Set up the items that are needed for the controller to run
        }
        //#endregion
                
        //#region Public Functions
        function getMyData(params) {
            // If more than one call is needed to retrieve data, then consider promise chaining
            var dataPromise = otherApplicationService.get(params)
                .then(loadData)
                .catch(errorHandler);

            var moreDataPromise = otherApplicationService.get(params)
                .then(loadMoreData)
                .catch(errorHanlder);

            $q.all([ dataPromise, moreDataPromise ])
                .finally(function (results) {
                    // Handle final updates, add model to scope, set form loaded, etc
                });
        }

        function saveMyData(parameters) {
            // Save data atomically in order to support offline mode
            var promisesArray = [];

            var dataPromise = null;
            if (addRequired) {
                dataPromise = otherApplicationService.addData(params);
            }
            else {
                dataPromise = otherApplicationService.updateOtherData(params)
            }
            promisesArray.push(dataPromise);

            var otherDataPromise = null;
            if (addRequired) {
                otherDataPromise = otherApplicationService.addOtherData(params);
            }
            else {
                otherDataPromise = otherApplicationService.updateOtherData(params)
            }
            promisesArray.push(otherDataPromise);

            $q.serial(promisesArray).catch(errorHandler);
        }
        //#endregion
        
        //#region Event Handlers
        function onSomeAction(event, args) {
            // add logic
        }
        //#endregion

        //#region Private Functions
        function loadData(data) {
            // returns a promise
        }

        function loadMoreData(data) {
            // returns a promise
        }

        function errorHanlder(error) {
            // add error hanlding logic
        }
        //#endregion

        // Run Init once everything is defined
        init();
    }
]);