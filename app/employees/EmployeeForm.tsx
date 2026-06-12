'use client';

import { useState } from 'react';
import { createEmployee } from './actions';

type Department = { id: number; name: string };
type Position = { id: number; name: string; departmentId: number };
type Skill = { id: number; name: string };

type Props = {
  departments: Department[];
  positions: Position[];
  skills: Skill[];
};

export default function EmployeeForm({
  departments = [],
  positions = [],
  skills = [],
}: Props) {
  const [selectedDeptId, setSelectedDeptId] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const selectedDepartment = departments.find(
    (d) => d.id === Number(selectedDeptId)
  );

  const filteredPositions = positions.filter(
    (p) => p.departmentId === Number(selectedDeptId)
  );

  const filteredSkillNames =
    selectedDepartment?.name === 'Human Resource'
      ? ['Recruitment', 'Interviewing', 'Payroll', 'Employee Relations']
      : ['React.js', 'Node.js', 'MySQL', 'UI/UX Design'];

  const visibleSkills = skills.filter((skill) =>
    filteredSkillNames.includes(skill.name)
  );

  async function handleSubmit(formData: FormData) {
    await createEmployee(formData);

    setSelectedDeptId('');
    setSelectedFileName('');
    setShowSuccess(true);

    const form = document.getElementById('employee-form') as HTMLFormElement;
    form?.reset();

    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  }

  return (
    <form
      id="employee-form"
      action={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-5"
    >
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl px-8 py-6 text-center">
            <div className="text-green-600 text-4xl mb-2">✓</div>
            <h3 className="text-lg font-bold text-gray-800">
              Data karyawan berhasil disimpan
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Form sudah dikosongkan kembali.
            </p>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-gray-800">Tambah Karyawan</h2>
        <p className="text-sm text-gray-500 mt-1">
          Lengkapi data karyawan pada form berikut.
        </p>
      </div>

      <input
        type="text"
        name="name"
        required
        placeholder="Nama lengkap"
        className="w-full border rounded-lg px-4 py-2"
      />

      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        className="w-full border rounded-lg px-4 py-2"
      />

      <div className="flex gap-6">
        <label>
          <input type="radio" name="gender" value="male" required /> Laki-laki
        </label>
        <label>
          <input type="radio" name="gender" value="female" /> Perempuan
        </label>
      </div>

      <select name="status" required className="w-full border rounded-lg px-4 py-2">
        <option value="">-- Pilih Status --</option>
        <option value="active">Aktif</option>
        <option value="probation">Masa Percobaan</option>
        <option value="inactive">Tidak Aktif</option>
      </select>

      <div className="grid grid-cols-2 gap-4">
        <select
          value={selectedDeptId}
          onChange={(e) => setSelectedDeptId(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="">-- Pilih Departemen --</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          name="positionId"
          required
          disabled={!selectedDeptId}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="">-- Pilih Jabatan --</option>
          {filteredPositions.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {visibleSkills.map((skill) => (
          <label
            key={skill.id}
            className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm"
          >
            <input type="checkbox" name="skills" value={skill.id} />
            {skill.name}
          </label>
        ))}
      </div>

      <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-blue-400 rounded-xl cursor-pointer bg-blue-50 hover:bg-blue-100 transition">
        {selectedFileName ? (
          <>
            <span className="text-green-600 font-semibold">
              Foto berhasil dipilih
            </span>
            <span className="text-xs text-gray-600 mt-1">
              {selectedFileName}
            </span>
            <span className="text-xs text-blue-500 mt-2">
              Klik untuk mengganti foto
            </span>
          </>
        ) : (
          <>
            <span className="text-blue-600 font-semibold">
              Klik untuk upload foto
            </span>
            <span className="text-xs text-gray-500 mt-1">Maksimal 10MB</span>
          </>
        )}

        <input
          type="file"
          name="photo"
          accept="image/*"
          className="hidden"
          onChange={(e) => setSelectedFileName(e.target.files?.[0]?.name || '')}
        />
      </label>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        Simpan Karyawan
      </button>
    </form>
  );
}