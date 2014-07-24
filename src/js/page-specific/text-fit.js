(function($) {
  $(function() {

    $( '.text-fit' ).each(function ( i, box ) {

        var width = $( box ).width(),
            html = '<span style="white-space:nowrap">',
            line = $( box ).wrapInner( html ).children()[ 0 ],
            n = 100;

        $( box ).css( 'font-size', n );

        while ( $( line ).width() > width ) {
            $( box ).css( 'font-size', --n );
        }

        $( box ).text( $( line ).text() );

    });
    
  });
}) ( jQuery );