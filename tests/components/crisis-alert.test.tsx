import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CrisisAlert } from '@/components/CrisisAlert';

describe('CrisisAlert Component', () => {
  it('should not render anything when isCrisis is false', () => {
    const { container } = render(<CrisisAlert isCrisis={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render alert and emergency resources when isCrisis is true', () => {
    render(<CrisisAlert isCrisis={true} />);
    
    // Check if main title appears
    expect(screen.getByText("You don't have to face this alone.")).toBeInTheDocument();
    
    // Check if the emergency helpline number is rendered
    expect(screen.getByText("1800-599-0019")).toBeInTheDocument();
    
    // Check if the advice text is rendered
    expect(screen.getByText(/mental health professional/i)).toBeInTheDocument();
  });
});
