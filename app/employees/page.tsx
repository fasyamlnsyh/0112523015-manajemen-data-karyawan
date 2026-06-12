import { prisma } from '@/lib/prisma';
import EmployeeForm from './EmployeeForm';
import { deleteEmployee } from './actions';
import Image from 'next/image';

export default async function EmployeesPage() {
  const departments = await prisma.department.findMany();
  const positions = await prisma.position.findMany();
  const skills = await prisma.skill.findMany();

  const employees = await prisma.employee.findMany({
    include: {
      skills: true,
      position: {
        include: {
          department: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-lg">
          <h1 className="text-3xl font-bold">Manajemen Data Karyawan</h1>
          <p className="text-blue-100 mt-2">
            Kelola data karyawan, jabatan, skill, status, dan foto profil dalam satu halaman.
          </p>
        </div>

        <EmployeeForm
          departments={departments}
          positions={positions}
          skills={skills}
        />

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">
              Data Karyawan ({employees.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-600 text-white uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">Foto</th>
                  <th className="px-4 py-3 text-left">Nama & Email</th>
                  <th className="px-4 py-3 text-left">Gender</th>
                  <th className="px-4 py-3 text-left">Jabatan & Dept.</th>
                  <th className="px-4 py-3 text-left">Skill</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {employees.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-400">
                      Belum ada data. Tambahkan karyawan pertama!
                    </td>
                  </tr>
                )}

                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-blue-50 transition">
                    <td className="px-4 py-3">
                      {emp.photoPath ? (
                        <Image
                          src={emp.photoPath}
                          alt={emp.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-semibold">
                          N/A
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{emp.name}</p>
                      <p className="text-gray-400 text-xs">{emp.email}</p>
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {emp.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
                    </td>

                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-700">
                        {emp.position.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {emp.position.department.name}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {emp.skills.length === 0 && (
                          <span className="text-gray-400 text-xs">-</span>
                        )}

                        {emp.skills.map((s) => (
                          <span
                            key={s.id}
                            className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full"
                          >
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-700">
                        {emp.status === 'active'
                          ? 'Aktif'
                          : emp.status === 'probation'
                          ? 'Masa Percobaan'
                          : 'Tidak Aktif'}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <form
                        action={async () => {
                          'use server';
                          await deleteEmployee(emp.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="bg-red-50 text-red-600 px-3 py-1 rounded-lg hover:bg-red-100 text-sm font-medium"
                        >
                          Hapus
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}