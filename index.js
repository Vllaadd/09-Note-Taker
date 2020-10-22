$.ajax({
    url: '/api/notes',
    typee: 'POST',
    dataType: 'text',
    success : function(data){
        console.log('Successfully added!')
        console.log(data)
    },
    error: function(){
        console.log('failed');
    }
})