import yup from '@/utils/yupValidation'

const schema = yup.object().shape({
    username: yup
        .string()
        .required('Không được để trống.')
        .matches(/^[a-z0-9]+$/, 'Tên tài khoản không được chứa ký tự đặc biệt'),
        // .min(6, 'Chứa ít nhất 6 ký tự'),
    password: yup
        .string()
        .required('Không được để trống.')
        .min(6, 'Mật khẩu phải lớn hơn 8 ký tự')
        .trim()
})
export default schema
