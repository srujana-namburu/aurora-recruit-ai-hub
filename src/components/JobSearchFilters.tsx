
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

interface JobSearchFiltersProps {
  onFilterChange: (filters: any) => void;
}

export const JobSearchFilters = ({ onFilterChange }: JobSearchFiltersProps) => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    location: '',
    employmentType: [] as string[],
    experienceLevel: [] as string[],
    salaryRange: [0, 200000],
    remoteOnly: false
  });

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleEmploymentTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked 
      ? [...filters.employmentType, type]
      : filters.employmentType.filter(t => t !== type);
    handleFilterChange('employmentType', newTypes);
  };

  const handleExperienceLevelChange = (level: string, checked: boolean) => {
    const newLevels = checked 
      ? [...filters.experienceLevel, level]
      : filters.experienceLevel.filter(l => l !== level);
    handleFilterChange('experienceLevel', newLevels);
  };

  const clearFilters = () => {
    const clearedFilters = {
      searchTerm: '',
      location: '',
      employmentType: [],
      experienceLevel: [],
      salaryRange: [0, 200000],
      remoteOnly: false
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Term */}
        <div>
          <Label htmlFor="search">Search Jobs</Label>
          <div className="relative mt-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Job title, keywords..."
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="City, state, or country"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="mt-1"
          />
        </div>

        {/* Employment Type */}
        <div>
          <Label>Employment Type</Label>
          <div className="mt-2 space-y-2">
            {['full_time', 'part_time', 'contract', 'internship'].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={filters.employmentType.includes(type)}
                  onCheckedChange={(checked) => 
                    handleEmploymentTypeChange(type, checked as boolean)
                  }
                />
                <Label htmlFor={type} className="text-sm">
                  {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <Label>Experience Level</Label>
          <div className="mt-2 space-y-2">
            {['entry', 'mid', 'senior', 'executive'].map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={level}
                  checked={filters.experienceLevel.includes(level)}
                  onCheckedChange={(checked) => 
                    handleExperienceLevelChange(level, checked as boolean)
                  }
                />
                <Label htmlFor={level} className="text-sm">
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Salary Range */}
        <div>
          <Label>Salary Range (Annual)</Label>
          <div className="mt-2 space-y-2">
            <Slider
              value={filters.salaryRange}
              onValueChange={(value) => handleFilterChange('salaryRange', value)}
              max={200000}
              min={0}
              step={5000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>${filters.salaryRange[0].toLocaleString()}</span>
              <span>${filters.salaryRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Remote Work */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remote"
            checked={filters.remoteOnly}
            onCheckedChange={(checked) => handleFilterChange('remoteOnly', checked)}
          />
          <Label htmlFor="remote" className="text-sm">
            Remote work only
          </Label>
        </div>

        {/* Clear Filters */}
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  );
};
