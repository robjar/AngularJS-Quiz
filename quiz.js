(function() {
  var app = angular.module('quiz', []);
  
  app.controller('QuizCtrl', function($scope, $http) {
    $scope.score = 0;
    $scope.activeQuestion = -1;
    $scope.activeQuestionAnswered = 0;
    $scope.percentage = 0;
    
    $http.get('questions.json')
      .then(function(response) {
        $scope.questions = response.data;
        $scope.totalQuestions = $scope.questions.length;
      });
  });
  
}());