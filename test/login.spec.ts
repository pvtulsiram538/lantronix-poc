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
            .post('/user/login')
            .send({
                "username": "venkata",
                "password": "1233"
            })

        expect(res.status).to.equal(200);



    });
    it('should return user not found', async () => {
        let res = await chai
            .request(app)
            .post('/user/login')
            .send({
                "username": "vdfdf",
                "password":"ddffd"

            })

        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('user not found');

    });
    it('should return  user already exists', async () => {
        let res = await chai
            .request(app)
            .post('/user/login')
            .send({
                "username": "venkata",
                "password":"ddffd"

            })

        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('wrong password');

    });

})