import { app } from '../app';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;


describe('user register API', () => {
    it('should return success response', async () => {
        let res = await chai
            .request(app)
            .post('/user/register')
            .send({
                "username": "venkata",
                "email": "tulsiramsid@secureid.com",
                "password": "1233"
            })

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('A verification mail has been sent to your registered mail');


    });
    it('should return validation fail for mandatory fields', async () => {
        let res = await chai
            .request(app)
            .post('/user/register')
            .send({
                "username": "venkata",

            })

        expect(res.status).to.equal(422);
        expect(res.body.message).to.equal('mandatory fields are missing');

    });
    it('should return  user already exists', async () => {
        let res = await chai
            .request(app)
            .post('/user/register')
            .send({
                "username": "venkata",

            })

        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('username already exists try different');

    });

})