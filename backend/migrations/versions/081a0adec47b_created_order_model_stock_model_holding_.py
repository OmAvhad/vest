"""created order model, stock model, holding model

Revision ID: 081a0adec47b
Revises: b707f83a95f9
Create Date: 2025-01-20 01:46:42.827420

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '081a0adec47b'
down_revision = 'b707f83a95f9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('balance', sa.Float(), nullable=False, server_default="0.0"))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('balance')

    # ### end Alembic commands ###
