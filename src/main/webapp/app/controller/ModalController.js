angular.module( "daybook" )
.controller( "AddEventController", function( $scope, $modalInstance ) {
    $scope.newEvent = {};
    $scope.complete = function() {
        $modalInstance.close( $scope.newEvent );
    }

    $scope.close = function() {
        $modalInstance.dismiss();
    }
} )
.controller( "AddOrderController", function( $scope, $modalInstance, $timeout, itemCompletionService ) {
    $scope.creatingListItem = {};
    $scope.itemNames = [];
    $scope.items = [];

    $timeout( function() {
        $scope.isInputFocused = true;
    }, 100 );

    itemCompletionService.getItemNames( {}, function( names ) {
        $scope.itemNames = names;
    }, function() { alert( "error!" ) } );


    $scope.onItemSelected = function( item ) {
        $scope.creatingListItem = item;
    }

    $scope.addNewItem = function() {
        $scope.items.push( $scope.creatingListItem );

        for ( var i = 0; i < $scope.itemNames.length; i++ ) {
            if ( $scope.itemNames[ i ].id === $scope.creatingListItem.id ) {
                $scope.itemNames.splice( i, 1 );
                break;
            }
        }

        $scope.creatingListItem = {};
        $scope.addItemForm.$setPristine();

        $scope.isInputFocused = true;
    }

    $scope.hasRequiredError = function( controlName ) {
        return $scope.addItemForm[ controlName ].$dirty && $scope.addItemForm[ controlName ].$error.required
    }

    $scope.saveAndClose = function() {
        $modalInstance.close( $scope.items );
    }

    $scope.close = function() {
        $modalInstance.dismiss();
    }
} )
.controller( "ConfirmController", function( $scope, $modalInstance, message ) {
    $scope.message = message;

    $scope.confirm = function() {
        $modalInstance.close();
    }

    $scope.cancel = function() {
        $modalInstance.dismiss();
    }
} )
.controller( "RegistrationController", function( $scope, $modalInstance, registrationService ) {
    $scope.newUser = {};

    $scope.register = function() {
        var newUser = {};
        newUser.login = $scope.newUser.login;
        newUser.nickname = $scope.newUser.nickname;

        var hex = ( new jsSHA( $scope.newUser.password, "TEXT" ) ).getHash( "SHA-512", "HEX" );

        var bytes = [];
        for ( var i = 0; i < hex.length; i = i + 2 ) bytes.push( parseInt( hex.substr( i, 2 ), 16 ) );
        newUser.verifier = bytes;

        registrationService.save( newUser,
            function() { $modalInstance.dismiss(); },
            function( error ) { alert( error ); }
        )
    }

    $scope.close = function() {
        $modalInstance.dismiss();
    }

    $scope.hasRequiredError = function( controlName ) {
        return $scope.newUserForm[ controlName ].$dirty && $scope.newUserForm[ controlName ].$error.required
    }

    $scope.hasConfirmError = function() {
        return $scope.newUserForm.confirm.$dirty && $scope.newUserForm.confirm.$error.confirm;
    }
});