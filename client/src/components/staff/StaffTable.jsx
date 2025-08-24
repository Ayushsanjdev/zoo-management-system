import React from "react";
import StatusBadge from "../common/StatusBadge";
import ActionButton from "../common/ActionButton";
import { Edit, Eye, Trash2 } from "lucide-react";

const StaffTable = ({ staff, onEdit, onDelete, onView }) => (
  <div className='bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden'>
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-700'>
        <thead className='bg-gray-700/50'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
              Staff Member
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
              Role
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
              Status
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
              Contact
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-700'>
          {staff.map((member) => (
            <tr
              key={member.id}
              className='hover:bg-gray-700/30 transition-colors duration-150'
            >
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='flex items-center'>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                      member.role === "Manager"
                        ? "bg-emerald-500"
                        : member.role === "Veterinarian"
                        ? "bg-blue-500"
                        : "bg-purple-500"
                    }`}
                  >
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className='ml-4'>
                    <div className='text-sm font-medium text-white'>
                      {member.name}
                    </div>
                    <div className='text-sm text-gray-400'>ID: {member.id}</div>
                  </div>
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-white'>{member.role}</div>
                <div className='text-sm text-gray-400'>{member.department}</div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <StatusBadge status={member.status} />
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                <div>{member.email}</div>
                <div>{member.phone}</div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2'>
                <ActionButton
                  onClick={() => onView(member)}
                  variant='outline'
                  size='sm'
                >
                  <Eye className='w-4 h-4' />
                </ActionButton>
                <ActionButton
                  onClick={() => onEdit(member)}
                  variant='secondary'
                  size='sm'
                >
                  <Edit className='w-4 h-4' />
                </ActionButton>
                <ActionButton
                  onClick={() => onDelete(member)}
                  variant='danger'
                  size='sm'
                >
                  <Trash2 className='w-4 h-4' />
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default StaffTable;
