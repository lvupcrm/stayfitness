"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { LeadFormData } from '@/types';

const schema = yup.object({
  name: yup.string().required('이름을 입력하세요.'),
  phone: yup.string().required('전화번호를 입력하세요.'),
  program: yup.string().optional().nullable().default(undefined),
}).required();


const LeadForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LeadFormData> = async (data) => {
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('서버 오류가 발생했습니다.');
      toast.success('상담 신청이 완료되었습니다!');
      reset();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : '제출 중 오류가 발생했습니다.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-10 bg-white rounded-2xl shadow-none mt-20 mb-24 border border-gray-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8">
          <label className="block mb-2 font-semibold text-green-800">이름 *</label>
          <input
            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-200 text-lg bg-gray-50"
            {...register('name')}
            placeholder="이름을 입력하세요"
            disabled={isSubmitting}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div className="mb-8">
          <label className="block mb-2 font-semibold text-green-800">전화번호 *</label>
          <input
            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-200 text-lg bg-gray-50"
            {...register('phone')}
            placeholder="010-1234-5678"
            disabled={isSubmitting}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
        <div className="mb-8">
          <label className="block mb-2 font-semibold text-green-800">관심 프로그램</label>
          <input
            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-200 text-lg bg-gray-50"
            {...register('program')}
            placeholder="예: PT, GX, 요가 등"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-full text-lg font-bold shadow-none transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? '제출 중...' : '상담 신청하기'}
        </button>
      </form>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default LeadForm; 