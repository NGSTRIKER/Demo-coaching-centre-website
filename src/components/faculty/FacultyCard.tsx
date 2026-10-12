import React from 'react';
import Link from 'next/link';
import { Faculty } from '@/lib/types';
import Avatar from '@/components/ui/Avatar';

export interface FacultyCardProps {
  faculty: Faculty;
}

export const FacultyCard: React.FC<FacultyCardProps> = ({ faculty }) => {
  return (
    <article className="faculty-card">
      <div className="faculty-card-header">
        <div className="faculty-avatar-container">
          <Avatar name={faculty.name} size="lg" alt={faculty.name} />
          <span className="faculty-demo-pill" title="Demo faculty profile placeholder">
            DEMO PROFILE
          </span>
        </div>

        <div className="faculty-info">
          <h3 className="faculty-card-name">
            <Link href={`/faculty/${faculty.slug}`} className="faculty-card-name-link">
              {faculty.name}
            </Link>
          </h3>
          <p className="faculty-card-role">{faculty.designation || faculty.subject}</p>
          <p className="faculty-card-dept">{faculty.department}</p>
        </div>
      </div>

      <div className="faculty-card-body">
        <div className="faculty-subject-highlight">
          <span className="faculty-subject-label">Subject:</span>
          <span className="faculty-subject-val">{faculty.subject}</span>
        </div>

        <p className="faculty-card-bio">{faculty.bio}</p>
      </div>

      <div className="faculty-card-footer">
        <Link href={`/faculty/${faculty.slug}`} className="faculty-view-profile-link">
          <span>View Profile</span>
          <span className="faculty-arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
};

export default FacultyCard;
