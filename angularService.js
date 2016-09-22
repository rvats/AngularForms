angular.module("AppName")
.factory("angularService", ["$http", "$q", "$filter", "settings", "offlineData", "otherService",
    function ($http, $q, $filter, settings, offlineData, otherService) {
        //#region API/Offline Routing
        var CONFIG = {
            apiControllerRoot: "/data/Plugins/FolderName/SubFolderName/",
            offlineApiUrl: "/SubFolderName/"
        };
        //#endregion

        //#region Private Variables
        var descriptiveNameFlag = false;
        var descriptiveNameCollection = [];
        //#endregion

        //#region API Functions
        // Call to Web API with Offline
        function functionUsingOfflineMode(parameterName) {
            var dfd = $q.defer();

            $http.get(settings.webApiBaseUrl + CONFIG.apiControllerRoot + "ApiFunctionName", { data: offlineData.getOfflineSettings(CONFIG.offlineApiUrl + '/' + (parameterName || 0).toString(), 'parameterName'), params: { parameterName: parameterName } })
                .success(function (data, status, header, config) {
                    dfd.resolve(data);
                }).error(function (data, status, header, config) {
                    dfd.reject(status);
                });

            return dfd.promise;
        }

        // Call to Web API without Offline
        function functionWithoutOfflineMode(parameterName) {
            var dfd = $q.defer();

            $http.post(settings.webApiBaseUrl + CONFIG.apiControllerRoot + 'ApiFunctionName', { params: { parameterName: parameterName } })
            .success(function (data, status, header, config) {
                dfd.resolve(data);
            })
            .error(function (data, status, header, config) {
                dfd.reject(status);
            });

            return dfd.promise;
        }
        //#endregion

        //#region Private Functions
        function privateHelperFunction(parameter) {
            // add logic
        }
        //#endregion

        //#region Service API
        return {
            functionUsingOfflineMode: functionUsingOfflineMode,
            functionWithoutOfflineMode: functionWithoutOfflineMode
        };
        //#endregion
    }
]);