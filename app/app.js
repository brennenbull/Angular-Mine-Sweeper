(function() {
  'use strict';

  angular.module('app', [])
    .component('mine', {
      controller: Controller,
      templateUrl:'../app/app.template.html'
    });

    function Controller($window) {
      const vm = this;
      vm.$onInit = function () {
        vm.rows = [];
        vm.show = true;
        vm.win = false;
        vm.lost = false;
        vm.numberOfCells = 100;
        vm.numberOfMines = 0;
      };

      vm.hidebutton = function () {
        vm.show = false;
      };

      vm.makeboard = function () {
        for(let i = 0; i < 10; i++){
          let row = {i};
          row.pieces = [];
          for(let j = 0; j < 10; j++){
            let piece = {i};
            piece.isClicked = false;
            piece.content = 'empty';
            row.pieces.push(piece);
          }
          vm.rows.push(row);
        }
      };

      vm.randomlocation = function () {
        let piece = Math.floor(Math.random() * 10);
        let row = Math.floor(Math.random() * 10);
        let mine = vm.rows[row].pieces[piece];
        return mine;
      };

      vm.placeMine = function () {
        let randomNum = Math.floor(Math.random() * 19) + 1;
        for (let i = 0; i < randomNum; i++) {
          let piece = vm.randomlocation();
          vm.numberOfMines ++;
          piece.content  = 'mine';
        }
      };

      vm.getPlace = function(row, column) {
        let piece = vm.rows[row].pieces[column];
        return piece;
      };

      vm.checkForMines = function (row, column) {
        let piece = vm.getPlace(row, column);
        if(piece.content == 'mine'){
          return;
        }
        let mineCount = 0;
        // row above
        if(row > 0){
          if(column > 0){
            if(vm.getPlace(row - 1, column - 1).content == 'mine'){
              mineCount ++;
            }

          }

          if(vm.getPlace(row - 1, column).content == 'mine'){
            mineCount ++;
          }

          if(column < 9){
            if(vm.getPlace(row - 1, column + 1).content == 'mine'){
              mineCount ++;
            }
          }
        }
        // same row
        if(column > 0){
          if(vm.getPlace(row, column - 1).content == 'mine'){
            mineCount ++;
          }
        }

        if(column < 9){
          if(vm.getPlace(row, column + 1).content == 'mine'){
            mineCount ++;
          }
        }
        // row bellow
        if(row < 9){
          if(column > 0){
            if(vm.getPlace(row + 1, column - 1).content == 'mine'){
              mineCount ++;
            }
          }

          if(vm.getPlace(row + 1, column).content == 'mine'){
            mineCount ++;
          }

          if(column < 9){
            if(vm.getPlace(row + 1, column + 1).content == 'mine'){
              mineCount ++;
            }
          }
        }
        // set content

        if(mineCount === 0){
          return;
        }else{
          piece.content = mineCount;
        }
      };

      vm.traverseBoard = function () {
        for (var y = 0; y < 10; y++) {
          for (var x = 0; x < 10; x++) {
            vm.checkForMines(y, x);
          }
        }
      };

      vm.hasWon = function() {
        vm.numberOfCells --;
        if(vm.numberOfCells ==
        vm.numberOfMines){
          vm.win = true;
        }
      };

      vm.resetGame = function () {
        $window.location.reload();
      };

      // vm.lookAround = function (pieceIndex, rowIndex){
      //   if(rowIndex > 0){
      //
      //     if(pieceIndex > 0){
      //       if(vm.getPlace(rowIndex - 1, pieceIndex - 1).content == 'empty'){
      //         vm.getPlace(rowIndex - 1, pieceIndex - 1).isClicked = true;
      //       }
      //
      //     }
      //
      //     if(vm.getPlace(rowIndex - 1, pieceIndex).content == 'empty'){
      //       vm.getPlace(rowIndex - 1, pieceIndex).isClicked = true;
      //     }
      //
      //     if(pieceIndex < 9){
      //       if(vm.getPlace(rowIndex - 1, pieceIndex + 1).content == 'empty'){
      //         vm.getPlace(rowIndex - 1, pieceIndex + 1).isClicked = true;
      //       }
      //     }
      //   }
      //   // same row
      //   if(pieceIndex > 0){
      //     if(vm.getPlace(rowIndex, pieceIndex - 1).content == 'empty'){
      //       vm.getPlace(rowIndex, pieceIndex - 1).isClicked = true;
      //     }
      //   }
      //
      //   if(pieceIndex < 9){
      //     if(vm.getPlace(rowIndex, pieceIndex + 1).content == 'empty'){
      //       vm.getPlace(rowIndex, pieceIndex + 1).isClicked = true;
      //     }
      //   }
      //   // row bellow
      //   if(rowIndex < 9){
      //
      //     if(pieceIndex > 0){
      //       if(vm.getPlace(rowIndex + 1, pieceIndex - 1).content == 'empty'){
      //         vm.getPlace(rowIndex + 1, pieceIndex - 1).isClicked = true;
      //       }
      //     }
      //
      //     if(vm.getPlace(rowIndex + 1, pieceIndex).content == 'empty'){
      //       vm.getPlace(rowIndex + 1, pieceIndex).isClicked = true;
      //     }
      //
      //     if(pieceIndex < 9){
      //       if(vm.getPlace(rowIndex + 1, pieceIndex + 1).content == 'empty'){
      //         vm.getPlace(rowIndex + 1, pieceIndex + 1).isClicked = true;
      //       }
      //     }
      //
      //   }
      // };

      vm.locatePiece =function(piece, row){
        let rowId = row.i;
        let pieceId = piece.i;
        // vm.lookAround(rowId, pieceId);
      };

    }

}());
