"use client";

import React, { useState } from "react";
import { MOCK_ENQUIRIES, EnquiryRecord } from "@/lib/mock-data";
import "@/styles/staff-enquiries.css";

export default function StaffEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>(MOCK_ENQUIRIES);

  const handleUpdateStatus = (id: string, newStatus: EnquiryRecord["status"]) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  return (
    <div className="staff-enquiries-page">
      <div className="enquiries-header">
        <div>
          <h1>Prospective Student Enquiries</h1>
          <p>Track incoming leads, parent consultations, and batch enrollment status.</p>
        </div>
      </div>

      <div className="enquiries-table-box">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th>Applicant / Parent</th>
              <th>Contact Details</th>
              <th>Course Interest</th>
              <th>Grade</th>
              <th>Received Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enq) => {
              let badgeClass = "new";
              if (enq.status === "Contacted") badgeClass = "contacted";
              if (enq.status === "Enrolled") badgeClass = "enrolled";
              if (enq.status === "Resolved") badgeClass = "resolved";

              return (
                <tr key={enq.id}>
                  <td>
                    <strong>{enq.name}</strong>
                  </td>
                  <td>
                    <div style={{ fontSize: "12px" }}>{enq.phone}</div>
                    <div style={{ fontSize: "11px", color: "var(--color-gray-500)" }}>{enq.email}</div>
                  </td>
                  <td>{enq.courseInterest}</td>
                  <td>{enq.grade}</td>
                  <td>{enq.date}</td>
                  <td>
                    <span className={`badge-enq ${badgeClass}`}>{enq.status}</span>
                  </td>
                  <td>
                    <select
                      value={enq.status}
                      onChange={(e) =>
                        handleUpdateStatus(enq.id, e.target.value as EnquiryRecord["status"])
                      }
                      style={{
                        padding: "4px 8px",
                        fontSize: "12px",
                        borderRadius: "4px",
                        border: "1px solid var(--color-gray-300)",
                        background: "white",
                        cursor: "pointer",
                      }}
                    >
                      <option value="New">Mark New</option>
                      <option value="Contacted">Mark Contacted</option>
                      <option value="Enrolled">Mark Enrolled</option>
                      <option value="Resolved">Mark Resolved</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
