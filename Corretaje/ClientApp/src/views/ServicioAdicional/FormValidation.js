import * as Yup from 'yup';

export const validation = Yup.object().shape({
	nombre: Yup.string().required('Campo obligatorio'),
	subtitulo: Yup.string().required('Campo obligatorio'),
	precio: Yup.number().required('Campo obligatorio').min(0, 'Solo numeros iguales o superiores a cero'),
	imagen: Yup.string().required('Campo obligatorio')
});