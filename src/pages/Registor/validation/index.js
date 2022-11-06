import yup from '@/utils/yupValidation'

const schema = yup.object().shape({
    firstName: yup.string().required('Không được để trống.').trim(),
    middleName: yup.string().required('Không được để trống.').trim(),
    lastName: yup.string().required('Không được để trống.').trim(),
    username: yup
        .string()
        .required('Không được để trống.')
        .matches(/^[a-z0-9]+$/, 'Tên tài khoản không được chứa ký tự đặc biệt')
        .min(6, 'Chứa ít nhất 6 ký tự'),
    password: yup
        .string()
        .required('Không được để trống.')
        .min(8, 'Mật khẩu phải lớn hơn 8 ký tự')
        .trim(),
    rePassword: yup.string().oneOf([yup.ref('password'), null], 'Chưa trùng với mật khẩu.'),
    email: yup.string().required('Không được để trống.').email('Sai định dạng email.').trim(),
    phone: yup
        .string()
        .required('Không được để trống.')
        .matches(/^[^\s]*(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Sai định dạng SĐT')
        .trim(),
    province: yup.string().required('Không được để trống.'),
    district: yup.string().required('Không được để trống.'),
    ward: yup.string().required('Không được để trống.'),
    address: yup.string().required('Không được để trống.').trim(),
    dateOfBirth: yup
        .date()
        .nullable()
        .required('Không được để trống.')
        .typeError('Vui lòng nhập định dạng dd/MM/yyyy')
})
export default schema
