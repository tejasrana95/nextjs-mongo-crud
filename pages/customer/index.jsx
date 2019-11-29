import React, { useState, useContext } from 'react';
import axios from 'axios';
import Layout from '../../components/layout';
import { UserContext } from '../../components/UserContext';
import Swal from 'sweetalert2';
import TableExp from './listData';
import CustomerForm from './customerForm';
import redirectTo from '../../lib/redirectTo';
import { withAuthSync } from '../../utils/auth';

class CustomerPage extends React.Component {
    updateTimeStamp = {};
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            updateTimeStamp: 0,
            id: null
        };
        this.updateList = this.updateList.bind(this);
        this.edit = this.edit.bind(this);
    }



    updateList(updateTime) {
        this.setState({ updateTimeStamp: updateTime });
    }

    componentDidMount() {
        // setTimeout(() => {
        //     if (!this.context.state.isLoggedIn) {
        //         redirectTo('/login');
        //     }
        // }, 2000);

    }

    edit(id) {
        this.setState({ id: id });
    }

    render() {

        return (
            <Layout>
                <style jsx>
                    {`
          img {
            max-width: 100vh;
            border-radius: 50%;
            box-shadow: rgba(0, 0, 0, 0.05) 0 10px 20px 1px;
          }
        `}
                </style>
                <h1>Customer</h1>
                <div>
                    <CustomerForm updateList={this.updateList} edit={this.state.id} />
                </div>

                <div>

                    <TableExp update={this.state.updateTimeStamp} edit={this.edit} />
                </div>
            </Layout>
        );
    }
}

export default withAuthSync(CustomerPage);

