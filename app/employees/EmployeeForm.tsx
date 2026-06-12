'use client';

import { useState } from 'react';
import { createEmployee } from './actions';

type Department = {
  id: number;
  name: string;
};

type Position = {
  id: number;
  name: string;
  departmentId: number;
};

type Skill = {
  id: number;
  name: string;
};

type Props = {
  departments: Department[];
  positions: Position[];
  skills: Skill[];
};

export default function EmployeeForm({ departments, positions, skills }: Props) {
  const [selectedDeptId, setSelectedDeptId] = useState<string>('');

  const filteredPositions = positions.filter(
    (p) => p.departmentId === parseInt(selectedDeptId)
  );

  return (
    <form action={createEmployee} className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Tambah Karyawan</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nama Lengkap
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="Contoh: Budi Santoso"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          placeholder="budi@email.com"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Jenis Kelamin
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input type="radio" name="gender" value="male" required />
            <span className="text-sm">Laki-laki</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="gender" value="female" />
            <span className="text-sm">Perempuan</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status Karyawan
        </label>
        <select
          name="status"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="">-- Pilih Status --</option>
          <option value="active">Aktif</option>
          <option value="probation">Masa Percobaan</option>
          <option value="inactive">Tidak Aktif</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Departemen
          </label>
          <select
            name="departmentId"
            value={selectedDeptId}
            onChange={(e) => setSelectedDeptId(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="">-- Pilih Departemen --</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jabatan
          </label>
          <select
            name="positionId"
            required
            disabled={!selectedDeptId}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
          >
            <option value="">
              {selectedDeptId ? '-- Pilih Jabatan --' : '(Pilih departemen dulu)'}
            </option>
            {filteredPositions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Skill
        </label>
        <div className="grid grid-cols-2 gap-2">
          {skills.map((skill) => (
            <label key={skill.id} className="flex items-center gap-2">
              <input type="checkbox" name="skills" value={skill.id} />
              <span className="text-sm">{skill.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Foto Profil
        </label>
        <input
          type="file"
          name="photo"
          accept="image/*"
          className="w-full text-sm text-gray-600"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700"
      >
        Simpan Karyawan
      </button>
    </form>
  );
}