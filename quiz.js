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
    
    $scope.selectAnswer = function(questionIdx, answerIdx) {
      var questionState = $scope.questions[questionIdx].questionState;
      
      if (questionState !== 'answered') {
        $scope.questions[questionIdx].selectedAnswer = answerIdx;
        var correctAnswer = $scope.questions[questionIdx].correct;
        $scope.questions[questionIdx].correctAnswer = correctAnswer;
        
        if (answerIdx === correctAnswer) {
          $scope.questions[questionIdx].correctness = 'correct';
          $scope.score += 1;
        } else {
          $scope.questions[questionIdx].correctness = 'incorrect';
        }
        $scope.questions[questionIdx].questionState = 'answered';
      }
    };
    
    $scope.isSelected = function(questionIdx, answerIdx) {
      return $scope.questions[questionIdx].selectedAnswer === answerIdx;
    };

    $scope.isCorrect = function(questionIdx, answerIdx) {
      return $scope.questions[questionIdx].correctAnswer === answerIdx;
    };
  });
  
}());