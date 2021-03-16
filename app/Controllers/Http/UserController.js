'use strict'

const User = use('App/Models/User');
const { validateAll } = use('Validator')

class UserController {
    async store({request, response}) {
        try {

            const validateMessages = {
                'email.unique': 'Já existe um usuário com esse e-mail cadastrato.',
                'cpf_cnpj.unique': 'Já existe um usuário com esse CPF/CNPJ cadastrato.',
            }
            const validation = await validateAll(request.all(), {
                username : 'required|min:5',
                email: 'required|email|unique:users',
                password:'required|min:6',
                cpf_cnpj:'required|unique:users',
                type: 'required'
            }, validateMessages)

            if (validation.fails()){
                return response.status(400).send({validate: validation.messages()})
            }


            const data = request.only(['username', 'email','password', 'cpf_cnpj','type']);

            const user = await User.create(data);

            return user;
        } catch (error) {
            return response.status(500).send({error: 'Error: '+error.message})
        }
    }

    async index({request, response}) {
        try {

            const users = await User.all();

            return users;
        } catch (error) {
            return response.status(500).send({error: 'Error: '+error.message})
        }
    }

    async login({request, response, auth}) {

        try {
            const {email, password} = request.all();
            const token = await auth.attempt(email, password );

            return token;
        } catch (error) {
            return response.status(401).send({validate: 'Verifique o e-mail e senha e tente novamente.'})
        }
    }

    async revokeUserToken ({ auth }) {
        const user = auth.current.user
        const token = auth.getAuthHeader()

        await user
          .tokens()
          .where('token', token)
          .update({ is_revoked: true })

        return response.status(200).send({message: 'the token has been revoked'})
      }

    async show({auth, params , response}) {

        try {
            if (auth.user.id !== Number(params.id)) {
                return response.status(400).send({error: "Error: You cannot see someone else's profile"})
            }

            return auth.user
        } catch (error) {
            return response.status(500).send({error: 'Error: '+error.message})
        }

    }

    async validToken({auth , request, response}) {

        try {

            const user = await auth.getUser();

            return user
        } catch (error) {
            return response.status(400).send({error: 'Error: Missing or invalid jwt token'})
        }

    }


    async update ({ params, request, response , auth}) {

        try{
            if (auth.user.id !== Number(params.id)) {
                return response.status(400).send({error: "Error: You cannot see someone else's profile"})
            }

            const data = request.only(['username', 'email','password', 'cpf_cnpj','type']);

            let user  = auth.user;


            if (!data){
            return response.status(404).send({error: "this item is not found"});
            }

            user.username = data.username;
            user.email = data.email;
            user.password = data.password;
            user.cpf_cnpj = data.cpf_cnpj;
            user.type = data.type;

            await user.save();

            return user;
        }catch(error){
            return response.status(500).send({error: 'Error: '+error.message})
        }

      }

}



module.exports = UserController
