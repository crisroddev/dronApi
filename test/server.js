const assert = require('assert');
const server = require('../server');
const request = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');

let should = chai.should();

describe('GET /drones', () => {
    it('respond with json', (done) => {
      request(server)
          .get('/drones')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
    });
    it('returns drones', (done) => {
        request(server)
            .post('/drones')
            .send({x: 1, y: 2})
            .then((res) => {
                var id = res.body.id;
                request(server)
                    .get('/drones')
                    .end((err, res) => {
                        res.status.should.be.equal(200);
                        res.body.should.have.length(1);
                        const drone = res.body.find((drone) => drone.id == id);
                        
                        drone.should.have.property('x');
                        drone.should.have.property('y');
                        drone.should.have.property('id');
                        drone.id.should.be.equal(id);
                        done();
                    });
            });
    });
});

describe('POST /drones', () => {
    it('responds with an id', (done) => {
        request(server)
            .post('/drones')
            .send({x: 1, y: 2})
            .end((err, res) => {
                res.status.should.be.equal(200);
                res.body.should.have.property("id");
                done();
            });
     })
});

describe('DELETE /drones', () => {
    it('responds with 200', (done) => {
        var id;
        request(server)
            .post('/drones')
            .send({x: 1, y:2})
            .then((res) => {
                request(server)
                    .delete(`/drones/${id}`)
                    .expect(200);
                done();
            });
    });
    it('responds with 400', (done) => {
        request(server)
            .delete('/drones/doesnotexist')
            .expect(400, done);
    });
});
