import { Button, Form, Input, Modal, Table, Popconfirm } from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const StudentManagement = () => {
    const [studentList, setStudentList] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [form] = useForm();
    const [editingStudent, setEditingStudent] = useState(null);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <div>
                    <Button onClick={() => handleEditStudent(record)} style={{ marginRight: 8 }}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this student?"
                        onConfirm={() => handleDeleteStudent(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const fetchStudent = async () => {
        try {
            const response = await axios.get('https://678d218df067bf9e24e95f72.mockapi.io/Student');
            setStudentList(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    useEffect(() => {
        fetchStudent();
    }, []);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        form.resetFields();
        setEditingStudent(null);
    };

    const handleSubmitForm = async (values) => {
        if (editingStudent) {
            // Edit student
            try {
                await axios.put(`https://678d218df067bf9e24e95f72.mockapi.io/Student/${editingStudent.id}`, values);
                toast.success("Student updated successfully!");
                fetchStudent();
                handleCloseModal();
            } catch (error) {
                toast.error("Failed to update student!");
            }
        } else {
            // Add new student
            try {
                await axios.post('https://678d218df067bf9e24e95f72.mockapi.io/Student', values);
                toast.success("Student added successfully!");
                fetchStudent();
                handleCloseModal();
            } catch (error) {
                toast.error("Failed to add student!");
            }
        }
    };

    const handleEditStudent = (student) => {
        setEditingStudent(student);
        form.setFieldsValue(student);
        handleOpenModal();
    };

    const handleDeleteStudent = async (id) => {
        try {
            await axios.delete(`https://678d218df067bf9e24e95f72.mockapi.io/Student/${id}`);
            toast.success("Student deleted successfully!");
            fetchStudent();
        } catch (error) {
            toast.error("Failed to delete student!");
        }
    };

    return (
        <div>
            <ToastContainer />
            <h1>Student Management</h1>
            <Button type="primary" onClick={handleOpenModal}>
                Add New Student
            </Button>
            <Table dataSource={studentList} columns={columns} rowKey="id" style={{ marginTop: 16 }} />
            <Modal
                title={editingStudent ? "Edit Student" : "Create New Student"}
                open={isModalOpen}
                onCancel={handleCloseModal}
                onOk={() => form.submit()}
            >
                <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmitForm}>
                    <FormItem
                        label="Code"
                        name="code"
                        rules={[{ required: true, message: "Code can't be empty!" }]}
                    >
                        <Input />
                    </FormItem>
                    <FormItem
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: "Full name can't be empty!" }]}
                    >
                        <Input />
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
};

export default StudentManagement;
