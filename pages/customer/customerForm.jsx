import React, { useState, useContext } from 'react';
import axios from 'axios';
import Layout from '../../components/layout';
import Swal from 'sweetalert2';
class CustomerForm extends React.Component {

    constructor(props) {

        super(props);

        this.initialState = {
            _id: '',
            name: '',
            email: '',
            phone: ''
        }

        this.state = {
            _id: '',
            name: '',
            email: '',
            phone: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.edit !== null) {
            this.getById(nextProps.edit);
        }
    }

    getById(id) {
        axios.get('/api/customer/' + id).then((data) => {
            this.setState({
                _id: data.data._id,
                name: data.data.name,
                email: data.data.email,
                phone: data.data.phone
            });

        }).catch(error => {
            console.error(error);
        });
        return;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state._id === '') {
            this.createSubmit();
        } else {
            this.updateSubmit();
        }
    }


    createSubmit() {
        axios.post('/api/customer', this.state).then((data) => {

            if (data.statusText === 'Created') {
                Swal.fire({
                    type: 'success',
                    title: 'Success',
                    text: 'Customer Added successfully',
                    timer: 1000,
                    toast: true
                });
                this.cancelCustomer();
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: data.data.message,
                    timer: 3000
                })
            }
            this.props.updateList(new Date().getTime());
        });
        return;
    }


    updateSubmit() {
        axios.put('/api/customer/' + this.state._id, this.state).then((data) => {
            Swal.fire({
                type: 'success',
                title: 'Success',
                text: 'Customer updated successfully',
                timer: 1000,
                toast: true
            });
            this.cancelCustomer();
            this.props.updateList(new Date().getTime());
        }).catch(error => {
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: error.response.data.message,
                timer: 3000,
                toast: false
            });
        });
        return;
    }

    cancelCustomer = () => {
        setTimeout(() => {
            this.setState(this.initialState);
        }, 1000);

    }

    componentDidMount() {
        this.setState(this.initialState);
    }

    render() {
        return (
            <>
                <style jsx>
                    {`
      label {
        display: block
      }
    `}
                </style>
                <section>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-4 col-sm-6">
                                <label htmlFor="name">

                                    <input required id="name" type="text" placeholder="Your name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                                </label>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <label htmlFor="email">
                                    <input required id="email" type="email" placeholder="Your Email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                                </label>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <label htmlFor="phone">
                                    <input required id="phone" type="tel" placeholder="Your Phone" value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} />
                                </label>
                            </div>
                        </div>
                        <button type="submit">Save</button>
                    </form>

                </section>
            </>
        )
    }
}

export default CustomerForm;
