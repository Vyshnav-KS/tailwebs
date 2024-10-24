class Api::TeachersController < ApplicationController
    skip_before_action :authorized, only: [:register, :login]

    def register
        user = Teacher.new(
            name: params[:name],
            email: params[:email],
            password: params[:password]
        )
        if Teacher.exists?(email: user.email)
            render json: { error: "Email already taken" }, status: :unprocessable_entity
        elsif user.save
            token = encode_token({ user_id: user.id })
            render json: { user: user, token: token }, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def login
        user = Teacher.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            token = encode_token({user_id: user.id})
            render json: {
                user: user,
                token: token
            },
            status: :ok
        else
            render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
    end

    private

    def user_params
        params.require(:teacher).permit([:name, :email, :password])
    end

    def encode_token(payload)
        # JWT.encode(payload, "ENV['SECRET_KEY']", 'HS256')
        JWT.encode(payload, "abcd_1234", 'HS256')
    end
end
