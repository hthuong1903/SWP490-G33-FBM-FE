import yup from '@/utils/yupValidation'

const schema = yup.object().shape({
    firstName: yup.string().required('Vui lòng điền vào trường này.').trim(),
    middleName: yup.string().required('Vui lòng điền vào trường này.').trim(),
    lastName: yup.string().required('Vui lòng điền vào trường này.').trim(),
    phone: yup.string().required('Vui lòng điền vào trường này.').matches(/^[^\s]*(84|0[3|5|7|8|9])+([0-9]{8})\b/,"Vui lòng nhập đúng định dạng SĐT").trim(),
    province: yup.string().required('Vui lòng điền vào trường này.'),
    district: yup.string().required('Vui lòng điền vào trường này.'),
    ward: yup.string().required('Vui lòng điền vào trường này.'),
    address: yup.string().required('Vui lòng điền vào trường này.').trim(),
})
export default schema