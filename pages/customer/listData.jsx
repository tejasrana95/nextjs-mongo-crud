import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
class TableExp extends React.Component {

    constructor(props) {

        super();
        this.state = {
            tableData: [{
                srNo: '',
                _id: '',
                name: '',
                email: '',
                phone: '',

            }],
            lastUpdate: 0
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.state.lastUpdate !== nextProps.update) {
            this.componentDidMount();
            this.setState({ lastUpdate: nextProps.update });
        }
    }

    componentDidMount() {
        axios.get('/api/customer', {
            responseType: 'json'
        }).then(response => {
            this.setState({ tableData: response.data });
        });
    }

    edit(id) {
        this.props.edit(id);
    }

    delete(id) {
        Swal.fire({
            type: 'question',
            title: 'Are you sure',
            text: "Are you sure to delete this?",
            timer: 3000,
            showCancelButton: true
        }).then(data => {
            if (data.value === true) {
               this.deleteApi(id)
            }
        })
    }

    deleteApi(id) {
        axios.delete('/api/customer/' + id, {
            responseType: 'json'
        }).then(response => {
            this.componentDidMount();
        });

    }

    render() {

        const { tableData } = this.state;
        return (
            <>

                <style jsx>
                    {`
      img {
        max-width: 100vh;
        border-radius: 50%;
        box-shadow: rgba(0, 0, 0, 0.05) 0 10px 20px 1px;
      }
      table {
          width: 100%;
      }
      tr th, tr td{
          border: 1px solid #ccc;
      }
    `}
                </style>
                <h1>List</h1>
                <div>
                    <table >
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((subData, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{subData._id}</td>
                                    <td>{subData.name}</td>
                                    <td>{subData.email}</td>
                                    <td>{subData.phone}</td>
                                    <td>
                                        <a onClick={() => this.edit(subData._id)} >
                                            <span className="fa fa-edit" ></span>
                                        </a>
                                        &nbsp;
                                        <a onClick={() => this.delete(subData._id)} >
                                            <span className="fa fa-trash" ></span>
                                        </a>

                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </>
        );
    }
}

export default TableExp;