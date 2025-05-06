import { ErroCustom } from "../../errors/error-custom";
import { UserEntity } from "../../models/user/user.entity";
import { IEncrypt } from "../../providers/encrypt/iencrypt.interface";
import { IMessagerBrokerAccess } from "../../providers/messager-broker-access/implementations/imessager-broker-access.interface";
import { ICreateUserDTO } from "./icreate-user-dto.interface";

export class CreateUserApplication {
    constructor(
        private readonly messagerBroker: IMessagerBrokerAccess,
        private readonly userEntity: typeof UserEntity,
        private readonly encrypt: IEncrypt
    ) { }

    /**
     * Handle
     * @param userSend 
     */
    async execute(userSend: ICreateUserDTO): Promise<any> {
        console.log('[1] Verificando e-mail...');
        await this.emailExist(userSend.email);

        console.log('[2] Gerando hash da senha...');
        const pwd = await this.encrypt.hashPassword(userSend.password);

        console.log('[3] Criando usuário...');
        await this.userEntity.create({
            name: userSend.name,
            email: userSend.email,
            password: pwd,
            cellPhone: userSend.cellPhone
        });

        console.log('[4] Enviando mensagem para fila de e-mail...');
        await this.messagerBroker.sendPubSub({
            queue: 'send-email-new-user',
            message: {
                email: userSend.email,
                name: userSend.name
            }
        });

        console.log('[5] Finalizado com sucesso!');
    }

    /**
     * Email Exist
     * @param email 
     */
    private async emailExist(email: string) {
        try {
            console.log('[1.1] Buscando e-mail no banco...');
            const { count } = await this.userEntity.findAndCountAll({
                where: { email }
            });
            console.log('[1.2] E-mail encontrado:', count);

            if (count) {
                throw new ErroCustom({
                    code: 400,
                    error: 'E-mail em uso.'
                });
            }
        } catch (err) {
            console.error('[ERRO] Falha ao verificar e-mail:', err);
            throw err;
        }
    }
}