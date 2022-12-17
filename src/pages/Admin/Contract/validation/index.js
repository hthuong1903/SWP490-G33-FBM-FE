import yup from '@/utils/yupValidation'

const schema = yup.object().shape({
    // name: yup.string().required('Vui lòng điền vào trường này.').trim(),
    content: yup.string().required('Vui lòng điền vào trường này.').trim(),
    salary: yup
        .number()
        .required('Vui lòng điền vào trường này.')
        .min(1000, 'Vui lòng nhập giá trị lớn hơn 1000')
        .typeError('Vui lòng nhập giá trị lớn hơn 1000')
        .max(100000000, 'Giá trị không hợp lệ'),
    startDate: yup.string().required('Vui lòng điền vào trường này.').typeError('Vui lòng nhập đúng định dạng ngày tháng')
})
export default schema
