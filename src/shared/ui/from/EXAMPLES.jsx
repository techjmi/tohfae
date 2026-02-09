/**
 * Form Component Examples
 *
 * Comprehensive examples showing all form component features
 */

"use client";
import React, { useState } from 'react';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
import Checkbox from './Checkbox';
import Radio from './Radio';
import {
    INPUT_TYPE, INPUT_VARIANT, INPUT_SIZE, INPUT_STATE, INPUT_RADIUS,
    SELECT_VARIANT, SELECT_SIZE, SELECT_STATE, SELECT_RADIUS,
    TEXTAREA_VARIANT, TEXTAREA_SIZE, TEXTAREA_STATE, TEXTAREA_RADIUS, TEXTAREA_RESIZE,
    CHECKBOX_SIZE, CHECKBOX_STATE, CHECKBOX_VARIANT,
    RADIO_SIZE, RADIO_STATE, RADIO_VARIANT,
} from './form.constant';
import { Icon } from '@/shared/icons';

// ============================================
// Example 1: Simple Input
// ============================================
export function SimpleInputExample() {
    const [value, setValue] = useState('');

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Simple Input</h3>
            <p className="text-sm text-gray-600">Basic input with label and placeholder</p>
            
            <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}

// ============================================
// Example 2: Input with Helper Text
// ============================================
export function InputWithHelperTextExample() {
    const [email, setEmail] = useState('');

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Input with Helper Text</h3>
            <p className="text-sm text-gray-600">Input with helpful guidance text</p>
            
            <Input
                type={INPUT_TYPE.EMAIL}
                label="Email Address"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                helperText="We'll never share your email with anyone else."
                required
            />
        </div>
    );
}

// ============================================
// Example 3: Input with Error Message
// ============================================
export function InputWithErrorExample() {
    const [email, setEmail] = useState('invalid-email');

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Input with Error</h3>
            <p className="text-sm text-gray-600">Input showing error state with message</p>
            
            <Input
                type={INPUT_TYPE.EMAIL}
                label="Email Address"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                state={INPUT_STATE.ERROR}
                errorMessage="Please enter a valid email address"
                required
            />
        </div>
    );
}

// ============================================
// Example 4: Input with Icons
// ============================================
export function InputWithIconsExample() {
    const [search, setSearch] = useState('');
    const [email, setEmail] = useState('');

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Input with Icons</h3>
            <p className="text-sm text-gray-600">Inputs with prefix and suffix icons</p>
            
            <div className="space-y-4">
                <Input
                    type={INPUT_TYPE.SEARCH}
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    prefixIcon="search"
                />
                
                <Input
                    type={INPUT_TYPE.EMAIL}
                    label="Email Address"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    prefixIcon="mail"
                    state={INPUT_STATE.SUCCESS}
                    suffixIcon="check"
                />
            </div>
        </div>
    );
}

// ============================================
// Example 5: All Variants
// ============================================
export function AllVariantsExample() {
    const [values, setValues] = useState({
        solid: '',
        outline: '',
        ghost: '',
        underline: '',
    });

    const handleChange = (variant) => (e) => {
        setValues({ ...values, [variant]: e.target.value });
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">All Input Variants</h3>
            <p className="text-sm text-gray-600">Different visual styles for inputs</p>
            
            <div className="space-y-4">
                <Input
                    label="Solid Variant"
                    variant={INPUT_VARIANT.SOLID}
                    placeholder="Solid input"
                    value={values.solid}
                    onChange={handleChange('solid')}
                />

                <Input
                    label="Outline Variant (Default)"
                    variant={INPUT_VARIANT.OUTLINE}
                    placeholder="Outline input"
                    value={values.outline}
                    onChange={handleChange('outline')}
                />

                <Input
                    label="Ghost Variant"
                    variant={INPUT_VARIANT.GHOST}
                    placeholder="Ghost input"
                    value={values.ghost}
                    onChange={handleChange('ghost')}
                />

                <Input
                    label="Underline Variant"
                    variant={INPUT_VARIANT.UNDERLINE}
                    placeholder="Underline input"
                    value={values.underline}
                    onChange={handleChange('underline')}
                />
            </div>
        </div>
    );
}

// ============================================
// Example 6: All Sizes
// ============================================
export function AllSizesExample() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">All Input Sizes</h3>
            <p className="text-sm text-gray-600">Different sizes for different use cases</p>

            <div className="space-y-4">
                <Input
                    label="Small (sm)"
                    size={INPUT_SIZE.SM}
                    placeholder="Small input"
                />

                <Input
                    label="Medium (md) - Default"
                    size={INPUT_SIZE.MD}
                    placeholder="Medium input"
                />

                <Input
                    label="Large (lg)"
                    size={INPUT_SIZE.LG}
                    placeholder="Large input"
                />

                <Input
                    label="Extra Large (xl)"
                    size={INPUT_SIZE.XL}
                    placeholder="Extra large input"
                />
            </div>
        </div>
    );
}

// ============================================
// Example 7: All States
// ============================================
export function AllStatesExample() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">All Input States</h3>
            <p className="text-sm text-gray-600">Different states for validation and feedback</p>

            <div className="space-y-4">
                <Input
                    label="Default State"
                    state={INPUT_STATE.DEFAULT}
                    placeholder="Default input"
                    helperText="This is a default input"
                />

                <Input
                    label="Error State"
                    state={INPUT_STATE.ERROR}
                    placeholder="Error input"
                    defaultValue="invalid@"
                    errorMessage="Please enter a valid email address"
                />

                <Input
                    label="Success State"
                    state={INPUT_STATE.SUCCESS}
                    placeholder="Success input"
                    defaultValue="valid@example.com"
                    helperText="Email is valid!"
                    suffixIcon="check"
                />

                <Input
                    label="Warning State"
                    state={INPUT_STATE.WARNING}
                    placeholder="Warning input"
                    defaultValue="admin@example.com"
                    helperText="This email is already registered"
                />

                <Input
                    label="Disabled State"
                    disabled
                    placeholder="Disabled input"
                    defaultValue="Cannot edit this"
                />

                <Input
                    label="Readonly State"
                    readonly
                    placeholder="Readonly input"
                    defaultValue="Can select but not edit"
                    helperText="This field is read-only"
                />
            </div>
        </div>
    );
}

// ============================================
// Example 8: Password Input with Toggle
// ============================================
export function PasswordInputExample() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Password Input with Toggle</h3>
            <p className="text-sm text-gray-600">Password field with show/hide functionality using centralized icons</p>

            <Input
                type={showPassword ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD}
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                prefixIcon="lock"
                suffixIcon={
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="pointer-events-auto hover:text-gray-600"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        <Icon name={showPassword ? "eyeOff" : "eye"} size={18} />
                    </button>
                }
                helperText="Must be at least 8 characters"
                required
            />
        </div>
    );
}

// ============================================
// Example 9: Search Input
// ============================================
export function SearchInputExample() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Search Input</h3>
            <p className="text-sm text-gray-600">Search field with icon and rounded style</p>

            <Input
                type={INPUT_TYPE.SEARCH}
                placeholder="Search products, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                prefixIcon="search"
                radius={INPUT_RADIUS.FULL}
                size={INPUT_SIZE.LG}
            />
        </div>
    );
}

// ============================================
// Example 10: Form Example with Multiple Inputs
// ============================================
export function FormExample() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert('Form submitted successfully!');
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Complete Form Example</h3>
            <p className="text-sm text-gray-600">Registration form with validation</p>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <Input
                    label="Full Name"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange('fullName')}
                    state={errors.fullName ? INPUT_STATE.ERROR : INPUT_STATE.DEFAULT}
                    errorMessage={errors.fullName}
                    prefixIcon="user"
                    required
                />

                <Input
                    type={INPUT_TYPE.EMAIL}
                    label="Email Address"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange('email')}
                    state={errors.email ? INPUT_STATE.ERROR : INPUT_STATE.DEFAULT}
                    errorMessage={errors.email}
                    prefixIcon="mail"
                    required
                />

                <Input
                    type={INPUT_TYPE.TEL}
                    label="Phone Number"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange('phone')}
                    state={errors.phone ? INPUT_STATE.ERROR : INPUT_STATE.DEFAULT}
                    errorMessage={errors.phone}
                    prefixIcon="phone"
                    required
                />

                <Input
                    type={INPUT_TYPE.PASSWORD}
                    label="Password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange('password')}
                    state={errors.password ? INPUT_STATE.ERROR : INPUT_STATE.DEFAULT}
                    errorMessage={errors.password}
                    prefixIcon="lock"
                    helperText="Must be at least 8 characters"
                    required
                />

                <Input
                    type={INPUT_TYPE.PASSWORD}
                    label="Confirm Password"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    state={errors.confirmPassword ? INPUT_STATE.ERROR : INPUT_STATE.DEFAULT}
                    errorMessage={errors.confirmPassword}
                    prefixIcon="lock"
                    required
                />

                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Create Account
                </button>
            </form>
        </div>
    );
}

// ============================================
// Example 11: All Radius Options
// ============================================
export function AllRadiusExample() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">All Border Radius Options</h3>
            <p className="text-sm text-gray-600">Different border radius styles</p>

            <div className="space-y-4">
                <Input
                    label="No Radius"
                    radius={INPUT_RADIUS.NONE}
                    placeholder="No border radius"
                />

                <Input
                    label="Small Radius"
                    radius={INPUT_RADIUS.SM}
                    placeholder="Small border radius"
                />

                <Input
                    label="Medium Radius (Default)"
                    radius={INPUT_RADIUS.MD}
                    placeholder="Medium border radius"
                />

                <Input
                    label="Large Radius"
                    radius={INPUT_RADIUS.LG}
                    placeholder="Large border radius"
                />

                <Input
                    label="Full Radius (Pill)"
                    radius={INPUT_RADIUS.FULL}
                    placeholder="Full border radius"
                />
            </div>
        </div>
    );
}

// ============================================
// SELECT EXAMPLES
// ============================================
export function SelectExample() {
    const [country, setCountry] = useState('');

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Select Examples</h3>

            <Select
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                helperText="Select your country"
            >
                <option value="">Choose a country</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
            </Select>

            <Select
                label="Priority"
                variant={SELECT_VARIANT.SOLID}
                size={SELECT_SIZE.LG}
                state={SELECT_STATE.SUCCESS}
            >
                <option value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </Select>

            <Select
                label="Category"
                state={SELECT_STATE.ERROR}
                errorMessage="Please select a category"
                required
            >
                <option value="">Select category</option>
                <option value="tech">Technology</option>
                <option value="design">Design</option>
            </Select>
        </div>
    );
}

// ============================================
// TEXTAREA EXAMPLES
// ============================================
export function TextareaExample() {
    const [message, setMessage] = useState('');

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Textarea Examples</h3>

            <Textarea
                label="Message"
                placeholder="Enter your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                helperText="Maximum 500 characters"
                rows={4}
            />

            <Textarea
                label="Description"
                variant={TEXTAREA_VARIANT.SOLID}
                size={TEXTAREA_SIZE.LG}
                resize={TEXTAREA_RESIZE.NONE}
                rows={6}
                placeholder="Describe your project..."
            />

            <Textarea
                label="Comments"
                state={TEXTAREA_STATE.ERROR}
                errorMessage="Comment is required"
                required
                rows={3}
            />
        </div>
    );
}

// ============================================
// CHECKBOX EXAMPLES
// ============================================
export function CheckboxExample() {
    const [agreed, setAgreed] = useState(false);
    const [newsletter, setNewsletter] = useState(false);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Checkbox Examples</h3>

            <Checkbox
                label="I agree to the terms and conditions"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
            />

            <Checkbox
                label="Subscribe to newsletter"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                helperText="Get weekly updates about new features"
                size={CHECKBOX_SIZE.LG}
            />

            <Checkbox
                label="Accept marketing emails"
                state={CHECKBOX_STATE.ERROR}
                errorMessage="You must accept to continue"
            />

            <Checkbox
                label="Disabled checkbox"
                disabled
                checked
            />
        </div>
    );
}

// ============================================
// RADIO EXAMPLES
// ============================================
export function RadioExample() {
    const [plan, setPlan] = useState('');
    const [payment, setPayment] = useState('');

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Radio Examples</h3>

            <div className="space-y-2">
                <p className="font-medium text-gray-900">Select Plan</p>
                <Radio
                    name="plan"
                    value="free"
                    label="Free Plan"
                    checked={plan === 'free'}
                    onChange={(e) => setPlan(e.target.value)}
                    helperText="Basic features included"
                />
                <Radio
                    name="plan"
                    value="pro"
                    label="Pro Plan"
                    checked={plan === 'pro'}
                    onChange={(e) => setPlan(e.target.value)}
                    helperText="All features included"
                />
                <Radio
                    name="plan"
                    value="enterprise"
                    label="Enterprise Plan"
                    checked={plan === 'enterprise'}
                    onChange={(e) => setPlan(e.target.value)}
                    disabled
                />
            </div>

            <div className="space-y-2">
                <p className="font-medium text-gray-900">Payment Method</p>
                <Radio
                    name="payment"
                    value="card"
                    label="Credit Card"
                    checked={payment === 'card'}
                    onChange={(e) => setPayment(e.target.value)}
                    size={RADIO_SIZE.LG}
                />
                <Radio
                    name="payment"
                    value="paypal"
                    label="PayPal"
                    checked={payment === 'paypal'}
                    onChange={(e) => setPayment(e.target.value)}
                    size={RADIO_SIZE.LG}
                />
            </div>
        </div>
    );
}

// ============================================
// COMPREHENSIVE FORM EXAMPLE
// ============================================
export function ComprehensiveFormExample() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        country: '',
        message: '',
        agreeTerms: false,
        newsletter: false,
        plan: '',
        payment: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>

                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        required
                        prefixIcon="user"
                    />

                    <Input
                        type={INPUT_TYPE.EMAIL}
                        label="Email Address"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                        prefixIcon="mail"
                        helperText="We'll never share your email"
                    />

                    <Input
                        type={INPUT_TYPE.TEL}
                        label="Phone Number"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        prefixIcon="phone"
                    />

                    <Select
                        label="Country"
                        value={formData.country}
                        onChange={(e) => handleChange('country', e.target.value)}
                        required
                    >
                        <option value="">Select your country</option>
                        <option value="us">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="ca">Canada</option>
                        <option value="au">Australia</option>
                    </Select>
                </div>

                {/* Message */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Your Message</h3>

                    <Textarea
                        label="Message"
                        placeholder="Tell us about your project..."
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        required
                        rows={5}
                        helperText="Minimum 20 characters"
                    />
                </div>

                {/* Plan Selection */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Select Plan</h3>

                    <div className="space-y-2">
                        <Radio
                            name="plan"
                            value="free"
                            label="Free Plan - $0/month"
                            checked={formData.plan === 'free'}
                            onChange={(e) => handleChange('plan', e.target.value)}
                            helperText="Basic features for individuals"
                        />
                        <Radio
                            name="plan"
                            value="pro"
                            label="Pro Plan - $29/month"
                            checked={formData.plan === 'pro'}
                            onChange={(e) => handleChange('plan', e.target.value)}
                            helperText="Advanced features for professionals"
                        />
                        <Radio
                            name="plan"
                            value="enterprise"
                            label="Enterprise Plan - Custom pricing"
                            checked={formData.plan === 'enterprise'}
                            onChange={(e) => handleChange('plan', e.target.value)}
                            helperText="Custom solutions for teams"
                        />
                    </div>
                </div>

                {/* Preferences */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>

                    <Checkbox
                        label="I agree to the Terms and Conditions"
                        checked={formData.agreeTerms}
                        onChange={(e) => handleChange('agreeTerms', e.target.checked)}
                        required
                    />

                    <Checkbox
                        label="Subscribe to newsletter"
                        checked={formData.newsletter}
                        onChange={(e) => handleChange('newsletter', e.target.checked)}
                        helperText="Get weekly updates and special offers"
                    />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                    >
                        Submit Form
                    </button>
                </div>
            </form>
        </div>
    );
}

