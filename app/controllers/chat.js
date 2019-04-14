module.exports.iniChat = (application, req, res)=>{

    let dadosForm = req.body;

    req.assert('apelido', 'nome ou apelido é obrigatorio').notEmpty();
    req.assert('apelido', 'nome ou apelido deve conter entre 3 e 15 caracteres').len(3, 15);

    let erros = req.validationErrors();

    if(erros){
        res.render('index', {validacao : erros})
        return;
    }

    application.get('io'). emit('msgParaCliente', {apelido : dadosForm.apelido, mensagem: 'Acabou de entrar no chat'})

    res.render('chat', {dadosForm : dadosForm})
}