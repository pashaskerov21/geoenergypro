'use client'
import React from 'react'
import * as Yup from 'yup'
import { LocaleType } from '../types/general/type'
import { MessageDataType } from '../types/data/type'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { Message } from '../class'
import Swal from 'sweetalert2'

type FormProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const ContactForm: React.FC<FormProps> = ({ activeLocale, dictionary }) => {
    const message = new Message();

    const initialValues: MessageDataType = {
        fullname: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    };
    const validationSchema = Yup.object({
        fullname: Yup.string().required(),
        email: Yup.string().email().required(),
        phone: Yup.string().required(),
        subject: Yup.string().required(),
        message: Yup.string().required(),
    });
    const onSubmit = async (values: MessageDataType, actions: FormikHelpers<MessageDataType>) => {
        try {
            const response = await message.store(values);
            if(response === 'message_success'){
                Swal.fire({
                    icon: "success",
                    title: dictionary["congratulations"],
                    text: dictionary["message_success"],
                }).then((result) => {
                    if (result.isConfirmed) {
                        actions.resetForm();
                    }
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {
                formik => (
                    <Form className='contact_form'>
                        <div className="form_item full_w">
                            <label htmlFor="fullname">{dictionary['fullname']}</label>
                            <Field id="fullname" type="text" name="fullname" className={`${formik.errors['fullname'] && formik.touched['fullname'] ? 'is-invalid' : ''}`} />
                        </div>
                        <div className="form_item">
                            <label htmlFor="email">{dictionary['email']}</label>
                            <Field id="email" type="text" name="email" className={`${formik.errors['email'] && formik.touched['email'] ? 'is-invalid' : ''}`} />
                        </div>
                        <div className="form_item">
                            <label htmlFor="phone">{dictionary['phone']}</label>
                            <Field id="phone" type="text" name="phone" className={`${formik.errors['phone'] && formik.touched['phone'] ? 'is-invalid' : ''}`} />
                        </div>
                        <div className="form_item full_w">
                            <label htmlFor="subject">{dictionary['subject']}</label>
                            <Field id="subject" type="text" name="subject" className={`${formik.errors['subject'] && formik.touched['subject'] ? 'is-invalid' : ''}`} />
                        </div>
                        <div className="form_item full_w">
                            <label htmlFor="message">{dictionary['message']}</label>
                            <Field as="textarea" id="message" name="message" className={`${formik.errors['message'] && formik.touched['message'] ? 'is-invalid' : ''}`} />
                        </div>
                        <div className="form_item full_w">
                            <button type="submit">{dictionary['send']}</button>
                        </div>
                    </Form>
                )
            }
        </Formik>
    )
}

export default React.memo(ContactForm)
