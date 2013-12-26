 var idHumanos='a';
 var activadoClik=1;
$(document).on('click','.button', function(e){
    var id = this.id;
    switch(id){
        case 'btnAD':
        if(activadoClik==0){
            $('#btnAD').empty();
            $('#btnAD').append('Desactivar');
            activadoClik=1;
            break;
        }
        if(activadoClik==1){
            activadoClik=0;   
            $('#top').val('');
            $('#left').val('');
            $('#btnAD').empty();
            $('#btnAD').append('Activar');
            
            
        } 
            break;
        case 'btnCrear':
            $('#divCreador').append('<img id="'+idHumanos+'" class="humano" src="http://www.downloadclipart.net/large/17987-black-stick-man-design.png" height="80"  width="40"/>'); 
            $('#divCreador').children('#'+idHumanos).hover(function(){
                $(this).css({ left: $('#top').val()+"px", top: $('#left').val()+"px" });
             });
            $('#'+idHumanos).css({ left: "0px", top: "0px" });
            idHumanos+='a';
            break;
        case 'btnBorrar':
            $('#divCreador').empty();
            break;
        case 'btnAA':
            $('#top').val('');
            break;
        case 'btnID':
            $('#left').val('');
            break;
    }
});
$(document).on('click','', function(e){
    if(activadoClik==1){
        $('#top').val(e.pageX);
        $('#left').val(e.pageY); 
    }
   }); 
