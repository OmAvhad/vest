"""created users model

Revision ID: 6139557845fc
Revises: aa98e59c767f
Create Date: 2025-01-19 14:03:05.497852

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6139557845fc'
down_revision = 'aa98e59c767f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('password_hash', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    # ### end Alembic commands ###
