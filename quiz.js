(function() {
  var app = angular.module('quiz', ['ngSanitize']);
  
  app.controller('QuizCtrl', function($scope, $http, $sce) {
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
        
        $scope.percentage = ($scope.score / $scope.totalQuestions * 100).toFixed(2);
      }
    };
    
    $scope.isSelected = function(questionIdx, answerIdx) {
      return $scope.questions[questionIdx].selectedAnswer === answerIdx;
    };

    $scope.isCorrect = function(questionIdx, answerIdx) {
      return $scope.questions[questionIdx].correctAnswer === answerIdx;
    };
    
    $scope.continue = function() {
      $scope.activeQuestion += 1;
    };
    
    $scope.createShareLinks = function(percentage) {
      var url = 'http://angularjsquiz.com',
          emailLink = '<a class="btn email" target="_blank" href="mailto:?subject=Try to beat my score a ' + percentage + '% on this quiz!&amp;body=I scored a ' + percentage + '% on this quiz about AngularJS. Try to beat my score at ' + url + '!">Email a friend</a>',
          twitterLink = '<a class="btn twitter" target="_blank" href="http://twitter.com/share?text=I scored a ' + percentage + '%25 on this quiz about AngularJS. Try to beat my score at&amp;hashtags=AngularJSQuiz&amp;url=' + url + '">Tweet your score</a>',
          newMarkup = emailLink + twitterLink;
      
      return $sce.trustAsHtml(newMarkup);
    };
      
  });
  
}());